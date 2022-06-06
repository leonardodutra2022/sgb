package br.ufc.crateus.sgb.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Cronograma;
import br.ufc.crateus.sgb.model.Inscricao;
import br.ufc.crateus.sgb.model.InscricaoValidacao;
import br.ufc.crateus.sgb.model.Notificacao;
import br.ufc.crateus.sgb.model.Processo;
import br.ufc.crateus.sgb.model.enums.StatusEnum;
import br.ufc.crateus.sgb.repository.CronogramaRepository;
import br.ufc.crateus.sgb.repository.InscricaoRepository;
import br.ufc.crateus.sgb.repository.InscricaoValidacaoRepository;
import br.ufc.crateus.sgb.repository.NotificacaoRepository;
import br.ufc.crateus.sgb.repository.ProcessoRepository;
import br.ufc.crateus.sgb.service.MailService;

/**
 * Classe de controle para manejar os cronogramas e processos vigentes, ou seja, com processos ativos. Esse controlador possui agendamento periódico, ou seja, a cada intervalo de tempo (hora) é verificado datas dos cronogramas e dependendo atual é invocado métodos para atualização ou registros, como status e etc.
 * @author Leonardo Dutra
 * @see ProcessoRepository  
 * @see CronogramaRepository
 * @see InscricaoRepository
 * @see InscricaoValidacaoRepository
 * @see Cronograma
 * @see Processo
 * @see Inscricao
 */
@Component
@EnableScheduling
public class AgendamentoController {
	
	@Autowired
	private ProcessoRepository processoRepository;
	
	@Autowired
	private CronogramaRepository cronogramaRepository;
	
	@Autowired
	private InscricaoRepository inscricaoRepository;
	
	@Autowired
	private InscricaoValidacaoRepository iValidacaoRepository;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private NotificacaoRepository notificacaoRepository;
	
	private List<Cronograma> crono = new ArrayList<Cronograma>();
	private List<Cronograma> itensCronoAtual = new ArrayList<Cronograma>();
	private List<Processo> processos = new ArrayList<Processo>();
	private List<Inscricao> inscricoes = new ArrayList<Inscricao>();
	private LocalDate dataAtual = LocalDate.now();
	private LocalDate dataOntem = LocalDate.ofEpochDay(dataAtual.toEpochDay()-1);
	
	private final long HORA = 1000 * 60 * 60;
	private final long SEGUNDO = 1000;
	private final long MINUTO = 1000 * 60;
	private final long MEIA_HORA = 1000 * 60 * 30;

	
	private List<Processo> getProcessos() {
		return this.processoRepository.findByAtivo();
	}
	
	private void initInscricoes() {
		inscricoes.clear();
		for(Processo p : processos)
			inscricoes.addAll(inscricaoRepository.findCustom(p.getId()));
	}
	
	private void initProcessos() {
		processos.clear();
		processos = getProcessos();
	}
	
	private void initCronograma() {
		crono.clear();
		itensCronoAtual.clear();
		
		for(Processo p : processos) {
			crono.addAll(getCronogramas(p));
			itensCronoAtual.addAll(cronogramaRepository.find(dataAtual, p.getId()));
		}
	}
	
	private List<Cronograma> getCronogramas(Processo processo){
		return this.cronogramaRepository.findByProcessoId(processo.getId());
	}
	
	@Scheduled(fixedDelay = HORA)
	public void monitoramento() {
		
	}
	
	private boolean isAfterInscricao(Processo p) {
		List<Cronograma> cronoTemp = cronogramaRepository.find(dataAtual, p.getId());
		
		for(Cronograma c : cronoTemp) {
			if(c.getSt() == StatusEnum.ANALISE_DOCUMENTAL 
					|| c.getSt() == StatusEnum.CONCLUIDO
					|| c.getSt() == StatusEnum.EM_ANALISE
					|| c.getSt() == StatusEnum.RECURSO
					|| c.getSt() == StatusEnum.RESULTADO_FINAL
					|| c.getSt() == StatusEnum.RESULTADO_PARCIAL
					|| c.getSt() == StatusEnum.ENTREVISTA
					|| c.getSt() == StatusEnum.SUSPENSO
					|| c.getSt() == StatusEnum.VISITA) {
				return true;
			}else {
				return false;
			}
		}
		return false;
	}
	
	private void checkInscricoes(List<Inscricao> listaInscricoes, Processo p){
		
		InscricaoValidacao iValidacao = new InscricaoValidacao();
		for(Inscricao i : listaInscricoes) {
			
			iValidacao = iValidacaoRepository.findByInscricaoId(i.getId());
			if(iValidacao != null) {
				if((!iValidacao.isDadosAcadCompleto() || !iValidacao.isDadosContatosLogradouroCompleto()
						|| !iValidacao.isDadosMoradiaTransporteCompleto() || !iValidacao.isDadosOutrosAuxiliosCompleto()
						|| !iValidacao.isDadosPessoaisCompleto() || !iValidacao.isDadosSaudeDeficienciaCompleto()
						|| !iValidacao.isDadosSocioEconCompleto() || !iValidacao.isDocumentacaoCompleta()
						|| !iValidacao.isInfoFinanceiroCompleto()) && (isAfterInscricao(p))) {
					
					if(i.getSituacao() != StatusEnum.INSCRICAO_CANCELADA) {
						i.setSituacao(StatusEnum.INSCRICAO_CANCELADA);	
						updateInscricao(i);						
					}
				}
			}

		}
	}
	
	private void checkEtapas(Processo processo) {
		
		for(Cronograma c : itensCronoAtual) {
			Processo processoTemp = processoRepository.findById(c.getProcesso().getId());
			if(c.getSt() != processoTemp.getStatusProcesso()) {
				if(c.getSt() == StatusEnum.CONCLUIDO)
					processoTemp.setAtivo(false);
						
				processoTemp.setStatusProcesso(c.getSt());
				updateEtapaProcesso(processoTemp);
			}
			notificar(c.getSt(), processoTemp);
		}
	}
	
	private void notificar(StatusEnum s, Processo p){
		
		List<Inscricao> inscricoes = inscricaoRepository.findByProcessoId(p.getId());
		
		switch(s) {
		case ANALISE_DOCUMENTAL:
			for(Inscricao i : inscricoes)
				notificarMail(i, s, "Notificação aos alunos sobre a nova etapa do processo => Análise Documental");
			
			break;
		case RECURSO:
			for(Inscricao i : inscricoes)
				notificarMail(i, s, "Notificação aos alunos sobre a nova etapa do processo => Recursos");

			break;
		case RECURSO_PARECER:
			for(Inscricao i : inscricoes)
				notificarMail(i, s, "Notificação aos alunos sobre a nova etapa do processo => Parecer dos Recursos");
			
			break;
		case RESULTADO_PARCIAL:
			for(Inscricao i : inscricoes)
				notificarMail(i, s, "Notificação aos alunos sobre a nova etapa do processo => Resultado Parcial");				
			
			break;
		case RESULTADO_FINAL:
			for(Inscricao i : inscricoes)
				notificarMail(i, s, "Notificação aos alunos sobre a nova etapa do processo => Resultado Final");
			
			break;
		case SUSPENSO:
			// envio de e-mail informando suspensão do processo... também controlar para não informar o tempo todo
			break;
		case CONCLUIDO:
			// envio de e-mail informando conclusão do processo... também controlar para não informar o tempo todo			
			break;
		}
	}
	
	private void updateEtapaProcesso(Processo processo) {
		processoRepository.save(processo);
	}
	
	private void updateInscricao(Inscricao i) {
		inscricaoRepository.save(i);
	}
	
	private void notificarMail(Inscricao i, StatusEnum tipoNotificacao, String descricaoNotificacao) {
//		Inscricao i = inscricaoRepository.findById(inscricao);
		Aluno a = i.getAluno();
		
		Notificacao n = new Notificacao();
		n.setDataRegistro(LocalDate.now());
		n.setHoraRegistro(LocalTime.now());
		n.setDescricao(descricaoNotificacao);
		n.setEnvio(true);
		n.setInscricaoRef(i);
		n.setStatusRefNotificacao(tipoNotificacao);
		
		try {
			
			switch(tipoNotificacao) {
			case ANALISE_DOCUMENTAL:
				if(notificacaoRepository.findByInscricaoRefAndStatusRefNotificacao(i, tipoNotificacao).isEmpty()
						&& (i.getSituacao() == StatusEnum.NAO_INSCRITO 
						|| i.getSituacao() == StatusEnum.INSCRICAO_CANCELADA)) {
					mailService.notificacaoInscricaoCanceladaEmail(a, i);
					notificacaoRepository.save(n);
				}else {
				}
				break;
			case RECURSO:
				if(notificacaoRepository.findByInscricaoRefAndStatusRefNotificacao(i, tipoNotificacao).isEmpty()
						&& i.getSituacao() == StatusEnum.INDEFERIDO) {
					mailService.notificacaoRecursoEmail(a, i);
					notificacaoRepository.save(n);
				}
				break;
			case RECURSO_PARECER:
				if(notificacaoRepository.findByInscricaoRefAndStatusRefNotificacao(i, tipoNotificacao).isEmpty()
						&& i.getSituacao() == StatusEnum.INDEFERIDO) {
					mailService.notificacaoRecursoParecerEmail(a, i);
					notificacaoRepository.save(n);
				}
				break;
			case RESULTADO_PARCIAL:
				if(notificacaoRepository.findByInscricaoRefAndStatusRefNotificacao(i, tipoNotificacao).isEmpty()) {
					mailService.notificacaoResultadoParcialEmail(a, i);
					notificacaoRepository.save(n);
				}
				break;
			case RESULTADO_FINAL:
				if(notificacaoRepository.findByInscricaoRefAndStatusRefNotificacao(i, tipoNotificacao).isEmpty()) {
					mailService.notificacaoResultadoFinalEmail(a, i);
					notificacaoRepository.save(n);
					if(i.getSituacao() == StatusEnum.DEFERIDO) {
						i.setSituacaoFinal(StatusEnum.DEFERIDO);
						this.inscricaoRepository.save(i);
					}
				}
				break;
			case SUSPENSO:
				break;
			case CONCLUIDO:
				break;
			}
			

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
