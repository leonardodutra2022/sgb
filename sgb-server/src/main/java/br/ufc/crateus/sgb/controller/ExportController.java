package br.ufc.crateus.sgb.controller;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.WordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Banco;
import br.ufc.crateus.sgb.model.Beneficio;
import br.ufc.crateus.sgb.model.Cidade;
import br.ufc.crateus.sgb.model.Concessao;
import br.ufc.crateus.sgb.model.Cronograma;
import br.ufc.crateus.sgb.model.DadosAcademicos;
import br.ufc.crateus.sgb.model.Documentacao;
import br.ufc.crateus.sgb.model.DocumentacaoArquivos;
import br.ufc.crateus.sgb.model.Inscricao;
import br.ufc.crateus.sgb.model.Logradouro;
import br.ufc.crateus.sgb.model.LogradouroTipo;
import br.ufc.crateus.sgb.model.OrgaoExpedidor;
import br.ufc.crateus.sgb.model.Processo;
import br.ufc.crateus.sgb.model.Recurso;
import br.ufc.crateus.sgb.model.SituacaoSocioEconFamiliar;
import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.model.enums.FormatoExportEnum;
import br.ufc.crateus.sgb.model.enums.ListasExportEnum;
import br.ufc.crateus.sgb.repository.AlunoRepository;
import br.ufc.crateus.sgb.repository.BancoRepository;
import br.ufc.crateus.sgb.repository.BeneficioRepository;
import br.ufc.crateus.sgb.repository.CidadeRepository;
import br.ufc.crateus.sgb.repository.ConcessaoRepository;
import br.ufc.crateus.sgb.repository.CronogramaRepository;
import br.ufc.crateus.sgb.repository.DadosAcademicosRepository;
import br.ufc.crateus.sgb.repository.DocumentacaoArquivosRepository;
import br.ufc.crateus.sgb.repository.DocumentacaoRepository;
import br.ufc.crateus.sgb.repository.InscricaoRepository;
import br.ufc.crateus.sgb.repository.LogradouroRepository;
import br.ufc.crateus.sgb.repository.LogradouroTipoRepository;
import br.ufc.crateus.sgb.repository.OrgaoExpedidorRepository;
import br.ufc.crateus.sgb.repository.ProcessoRepository;
import br.ufc.crateus.sgb.repository.RecursoRepository;
import br.ufc.crateus.sgb.repository.SituacaoSocioEconFamiliarRepository;
import br.ufc.crateus.sgb.repository.UsuarioRepository;
import br.ufc.crateus.sgb.utils.IClass;

/**
 * Controlador Rest para manejar API de exportação de arquivos em alguns formatos especificados 
 * @author Leonardo Dutra
 * @see AlunoRepository
 * @see BancoRepository
 * @see BeneficioRepository
 * @see CronogramaRepository
 * @see ConcessaoRepository
 * @see DadosAcademicosRepository
 * @see DocumentacaoRepository
 * @see InscricaoRepository
 * @see LogradouroRepository
 * @see LogradouroTipoRepository
 * @see OrgaoExpedidorRepository
 * @see ProcessoRepository
 * @see RecursoRepository
 * @see DocumentacaoArquivosRepository
 * @see SituacaoSocioEconFamiliarRepository
 * @see UsuarioRepository
 * @see CidadeRepository
 * @see ListasExportEnum
 * @see FormatoExportEnum
 * @see Aluno
 * @see Banco
 * @see Beneficio
 * @see Cronograma
 * @see Concessao
 * @see DadosAcademicos
 * @see Documentacao
 * @see DocumentacaoArquivos
 * @see Inscricao
 * @see Logradouro
 * @see LogradouroTipo
 * @see OrgaoExpedidor
 * @see Processo
 * @see Recurso
 * @see SituacaoSocioEconFamiliar
 * @see Usuario
 * @see Cidade
 * 
 * @apiNote Importante para consumir esta API, exemplo: http://localhost:8080/api/export.pdf + parametros na URL para PDF por exemplo e assim em diante
 */
@RequestMapping(value = "/api/export")
@Controller
public class ExportController implements IClass{

	@Autowired
	private AlunoRepository alunoRepository;
	
	@Autowired
	private BancoRepository bancoRepository;
	
	@Autowired
	private BeneficioRepository beneficioRepository;
	
	@Autowired
	private CronogramaRepository cronogramaRepository;
	
	@Autowired
	private ConcessaoRepository concessaoRepository;
	
	@Autowired
	private DadosAcademicosRepository dadosAcadRepository;
	
	@Autowired
	private DocumentacaoRepository documentacaoRepository;
	
	@Autowired
	private InscricaoRepository inscricaoRepository;
	
	@Autowired
	private LogradouroRepository logradouroRepository;
	
	@Autowired
	private LogradouroTipoRepository logradouroTipoRepository;
	
	@Autowired
	private OrgaoExpedidorRepository orgaoExpedidorRepository;
	
	@Autowired
	private ProcessoRepository processoRepository;
	
	@Autowired
	private RecursoRepository recursoRepository;
	
	@Autowired
	private DocumentacaoArquivosRepository documentacaoArquivosRepository;
	
	@Autowired
	private SituacaoSocioEconFamiliarRepository socioEconRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private CidadeRepository cidadeRepository;	
	
	
	private List<ClassCustom> camposMetodos = new ArrayList<ClassCustom>();
	private List<String> metodos = new ArrayList<String>();
	private Map<ListasExportEnum, List<?>> setListas = new HashMap<ListasExportEnum, List<?>>();
//	private Map<ListasExportEnum, List<Model>> setConfig = new HashMap<ListasExportEnum, List<Model>>();
	private Map<ListasExportEnum, Model> setConfig = new HashMap<ListasExportEnum, Model>();
	private Aluno alunoTemp = new Aluno();
	private Optional<Inscricao> inscricaoTemp = null;
	private Long idTemp = null;
	
	class ClassCustom {
		String campo;
		String metodo;
		
		public String getCampo() {
			return campo;
		}
		public void setCampo(String campo) {
			this.campo = campo;
		}
		public String getMetodo() {
			return metodo;
		}
		public void setMetodo(String metodo) {
			this.metodo = metodo;
		}
	}
	
	
	
	@GetMapping
	public String download(Model model,
			@RequestParam ListasExportEnum selectLista, 
			@RequestParam List<String> colunas,
			HttpServletResponse request,
			@RequestParam (required = false) Long id) {
		
			System.out.println("ID ===> " + id);
			    
		    model.addAttribute("colunas", colunas);
		    model.addAttribute("itemLista", selectLista);
		
		    setConfig(model, selectLista);
		    setListas(model, selectLista);
		    
	    return "";
	}
	
	@GetMapping("/cols")
	public ResponseEntity<List<String>> getCampos(@RequestParam ListasExportEnum lista, Model model){
		setConfig(model, lista);
		return new ResponseEntity<List<String>>(metodos,HttpStatus.OK);
	}
	
	@GetMapping("/colsFields")
	public ResponseEntity<List<ClassCustom>> getCamposMetodos(@RequestParam ListasExportEnum lista, Model model){
		setConfig(model, lista);
		return new ResponseEntity<List<ClassCustom>>(camposMetodos,HttpStatus.OK);
	}
	
	@GetMapping("/customize/saude")
	public ResponseEntity<List<ClassCustom>> getSaudeDeficiencia(@RequestParam (required = false) Long id, Model model){
		this.idTemp = id;
		setConfig(model, ListasExportEnum.SAUDE_DEFICIENCIA);
		return new ResponseEntity<List<ClassCustom>>(camposMetodos,HttpStatus.OK);
	}
	
	@GetMapping("/customize/moradia-transporte")
	public ResponseEntity<List<ClassCustom>> getMoradiaTransporte(@RequestParam (required = false) Long id, Model model){
		this.idTemp = id;
		setConfig(model, ListasExportEnum.MORADIA_TRANSPORTE);
		return new ResponseEntity<List<ClassCustom>>(camposMetodos,HttpStatus.OK);
	}
	
	@GetMapping("/customize/info-banco")
	public ResponseEntity<List<ClassCustom>> getInfoBanco(@RequestParam (required = false) Long id, Model model){
		this.idTemp = id;
		setConfig(model, ListasExportEnum.INFO_BANCO);
		return new ResponseEntity<List<ClassCustom>>(camposMetodos,HttpStatus.OK);
	}

	private void getDadosTemp(Long id) {
		this.inscricaoTemp = this.inscricaoRepository.findById(id);
		if(inscricaoTemp.isPresent())
			this.alunoTemp = inscricaoTemp.get().getAluno();	
	}

	private void setConfig(Model model, ListasExportEnum selectLista){
		switch(selectLista) {
	    	case ALUNOS:
	    		model.addAttribute("titulo","Lista Geral de Alunos");
	    		model.addAttribute("entidade", Aluno.class);
	    		setConfig.put(ListasExportEnum.ALUNOS, model);
	    		setListCols(Aluno.class);
	    		break;
	    	case ALUNOS_VALIDOS:
	    		model.addAttribute("titulo","Lista de Alunos Válidos");
	    		model.addAttribute("entidade", Aluno.class);
	    		setConfig.put(ListasExportEnum.ALUNOS, model);
	    		setListCols(Aluno.class);
	    		break;
	    	case BANCOS:
	    		model.addAttribute("titulo","Lista de Bancos");
	    		model.addAttribute("entidade", Banco.class);
	    		setConfig.put(ListasExportEnum.BANCOS, model);
	    		setListCols(Banco.class);
	      		break;
	    	case BENEFICIOS:
	    		model.addAttribute("titulo","Lista de Benefícios");
	    		model.addAttribute("entidade", Beneficio.class);
	    		setConfig.put(ListasExportEnum.BENEFICIOS, model);
	    		setListCols(Beneficio.class);
	      		break;
	    	case CRONOGRAMA:
	    		model.addAttribute("titulo","Lista de Cronogramas");
	    		model.addAttribute("entidade", Cronograma.class);
	    		setConfig.put(ListasExportEnum.CRONOGRAMA, model);
	    		setListCols(Cronograma.class);
	      		break;
	    	case CIDADES:
	    		model.addAttribute("titulo","Base de Cidades Brasileiras");
	    		model.addAttribute("entidade", Cidade.class);
	    		setConfig.put(ListasExportEnum.CIDADES, model);
	    		setListCols(Cidade.class);
	      		break;	      		
	    	case CONCESSOES:
	    		model.addAttribute("titulo","Lista de Concessões");
	    		model.addAttribute("entidade", Concessao.class);
	    		setConfig.put(ListasExportEnum.CONCESSOES, model);
	    		setListCols(Concessao.class);
	      		break;
	    	case DADOS_ACADEMICOS:
	    		model.addAttribute("titulo","Lista de Dados Acadêmicos");
	    		model.addAttribute("entidade", DadosAcademicos.class);
	    		setConfig.put(ListasExportEnum.DADOS_ACADEMICOS, model);
	    		setListCols(DadosAcademicos.class);
	      		break;
	    	case DOCUMENTACOES:
	    		model.addAttribute("titulo","Lista de Documentação");
	    		model.addAttribute("entidade", Documentacao.class);
	    		setConfig.put(ListasExportEnum.DOCUMENTACOES, model);
	    		setListCols(Documentacao.class);
	      		break;
	    	case DOCUMENTACAO_ARQUIVOS:
	    		model.addAttribute("titulo","Lista de Arquivos Documentais");
	    		model.addAttribute("entidade", DocumentacaoArquivos.class);
	    		setConfig.put(ListasExportEnum.DOCUMENTACAO_ARQUIVOS, model);
	    		setListCols(DocumentacaoArquivos.class);
	      		break;	      		
	    	case INSCRICOES:
	    		model.addAttribute("titulo","Lista de Inscrições");
	    		model.addAttribute("entidade", Inscricao.class);
	    		setConfig.put(ListasExportEnum.INSCRICOES, model);
	    		setListCols(Inscricao.class);
	      		break;
	    	case INFO_BANCO:
	    		model.addAttribute("titulo","Informações de Dados Bancários");
	    		model.addAttribute("entidade", Aluno.class);
	    		getDadosTemp(this.idTemp);
	    		setConfig.put(ListasExportEnum.INFO_BANCO, model);
	    		setColsInfoBanco(Aluno.class);
	     		break;	
	    	case LOGRADOUROS:
	    		model.addAttribute("titulo","Lista de Logradouros");
	    		model.addAttribute("entidade", Logradouro.class);
	    		setConfig.put(ListasExportEnum.LOGRADOUROS, model);
	    		setListCols(Logradouro.class);
	      		break;
	    	case LOGRADOURO_TIPOS:
	    		model.addAttribute("titulo","Lista de Tipo de Logradouros");
	    		model.addAttribute("entidade", LogradouroTipo.class);
	    		setConfig.put(ListasExportEnum.LOGRADOURO_TIPOS, model);
	    		setListCols(LogradouroTipo.class);
	      		break;
	    	case MORADIA_TRANSPORTE:
	    		model.addAttribute("titulo","Informações de Moradia | Transporte");
	    		model.addAttribute("entidade", Inscricao.class);
	    		getDadosTemp(this.idTemp);
	    		setConfig.put(ListasExportEnum.MORADIA_TRANSPORTE, model);
	    		setColsMoradiaTransporte(Inscricao.class);
	     		break;	      		
	    	case ORGAOS_EXPEDIDORES:
	    		model.addAttribute("titulo","Lista de Órgãos Expedidores");
	    		model.addAttribute("entidade", OrgaoExpedidor.class);
	    		setConfig.put(ListasExportEnum.ORGAOS_EXPEDIDORES, model);
	    		setListCols(OrgaoExpedidor.class);
	      		break;
	    	case PROCESSOS:
	    		model.addAttribute("titulo","Lista de Processos");
	    		model.addAttribute("entidade", Processo.class);
	    		setConfig.put(ListasExportEnum.PROCESSOS, model);
	    		setListCols(Processo.class);
	      		break;
	    	case RECURSOS:
	    		model.addAttribute("titulo","Lista de Recursos");
	    		model.addAttribute("entidade", Recurso.class);
	    		setConfig.put(ListasExportEnum.RECURSOS, model);
	    		setListCols(Recurso.class);
	      		break;
	    	case SOCIO_ECON_FAMILIAR:
	    		model.addAttribute("titulo","Lista de Familiares");
	    		model.addAttribute("entidade", SituacaoSocioEconFamiliar.class);
	    		setConfig.put(ListasExportEnum.SOCIO_ECON_FAMILIAR, model);
	    		setListCols(SituacaoSocioEconFamiliar.class);
	      		break;
	    	case USUARIO:
	    		model.addAttribute("titulo","Lista de Usuários");
	    		model.addAttribute("entidade", Usuario.class);
	    		setConfig.put(ListasExportEnum.USUARIO, model);
	    		setListCols(Usuario.class);
	     		break;
	    	case SAUDE_DEFICIENCIA:
	    		model.addAttribute("titulo","Informações de Saúde | Deficiência");
	    		model.addAttribute("entidade", Aluno.class);
	    		getDadosTemp(this.idTemp);
	    		setConfig.put(ListasExportEnum.SAUDE_DEFICIENCIA, model);
	    		setColsSaudeDeficiencia(Aluno.class);
	     		break;
		default:
			break;
		}
	}
	
	void setListas(Model model, ListasExportEnum selectLista) {
	    setListas.put(ListasExportEnum.ALUNOS, alunoRepository.findAll());
	    setListas.put(ListasExportEnum.ALUNOS_VALIDOS, alunoRepository.findValid());
	    setListas.put(ListasExportEnum.BANCOS, bancoRepository.findAll());
	    setListas.put(ListasExportEnum.BENEFICIOS, beneficioRepository.findAll());
	    setListas.put(ListasExportEnum.CONCESSOES, concessaoRepository.findAll());
	    setListas.put(ListasExportEnum.CIDADES, cidadeRepository.findAll());
	    setListas.put(ListasExportEnum.CRONOGRAMA, cronogramaRepository.findAll());
	    setListas.put(ListasExportEnum.DADOS_ACADEMICOS, dadosAcadRepository.findAll());
	    setListas.put(ListasExportEnum.DOCUMENTACOES, documentacaoRepository.findAll());
	    setListas.put(ListasExportEnum.DOCUMENTACAO_ARQUIVOS, documentacaoArquivosRepository.findAll());
	    setListas.put(ListasExportEnum.INSCRICOES, inscricaoRepository.findAll());
	    setListas.put(ListasExportEnum.LOGRADOURO_TIPOS, logradouroTipoRepository.findAll());
	    setListas.put(ListasExportEnum.LOGRADOUROS, logradouroRepository.findAll());
	    setListas.put(ListasExportEnum.ORGAOS_EXPEDIDORES, orgaoExpedidorRepository.findAll());
	    setListas.put(ListasExportEnum.PROCESSOS, processoRepository.findAllByOrderByAtivoDesc());
	    setListas.put(ListasExportEnum.RECURSOS, recursoRepository.findAll());
	    setListas.put(ListasExportEnum.SOCIO_ECON_FAMILIAR, socioEconRepository.findAll());
	    setListas.put(ListasExportEnum.USUARIO, usuarioRepository.findAll());
	    
		setListas.put(ListasExportEnum.MORADIA_TRANSPORTE, 
				inscricaoRepository.getInfoMoradiaTransporte(this.idTemp));
		setListas.put(ListasExportEnum.SAUDE_DEFICIENCIA, 
				alunoRepository.findAllById(this.alunoTemp.getId()));
		setListas.put(ListasExportEnum.INFO_BANCO, 
				alunoRepository.findAllById(this.alunoTemp.getId()));		
    
	    model.addAttribute("listaGeral", setListas.get(selectLista));
	}
	
	void setListCols(Class<?> cls){
		metodos.clear();
		camposMetodos.clear();
		for(Field f : getFields(cls)) {
			String metodoName = "get" + WordUtils.capitalize(f.getName());
			ClassCustom custom = new ClassCustom();
			custom.setCampo(f.getName());
			custom.setMetodo(metodoName);
			
			camposMetodos.add(custom);
			metodos.add(metodoName);
		}
	}
	
	void setColsSaudeDeficiencia(Class<?> cls){
		metodos.clear();
		camposMetodos.clear();
		for(Field f : getFields(cls)) {
			String metodoName = "get" + WordUtils.capitalize(f.getName());
			ClassCustom custom = new ClassCustom();
			
			if(f.getName().contains("doenca") 
					|| f.getName().contains("Doenca") 
					|| f.getName().contains("deficiencia")
					|| f.getName().contains("Deficiencia")) {
				
				custom.setCampo(f.getName());
				custom.setMetodo(metodoName);
				
				camposMetodos.add(custom);
				metodos.add(metodoName);
			}
		}
	}
	
	void setColsMoradiaTransporte(Class<?> cls){
		metodos.clear();
		camposMetodos.clear();
		for(Field f : getFields(cls)) {
			String metodoName = "get" + WordUtils.capitalize(f.getName());
			ClassCustom custom = new ClassCustom();
			
			if((f.getName().contains("transporte") 
					|| f.getName().contains("Transporte")
					|| f.getName().contains("deslocamento")
					|| f.getName().contains("Deslocamento")
					|| f.getName().contains("financiamento")
					|| f.getName().contains("Financiamento"))
					|| (f.getName().contains("moradia") 
						|| f.getName().contains("Moradia")) 
						&& !f.getName().startsWith("aux")) {
				
				custom.setCampo(f.getName());
				custom.setMetodo(metodoName);
				
				camposMetodos.add(custom);
				metodos.add(metodoName);
			}
		}
	}
	
	void setColsInfoBanco(Class<?> cls){
		metodos.clear();
		camposMetodos.clear();
		for(Field f : getFields(cls)) {
			String metodoName = "get" + WordUtils.capitalize(f.getName());
			ClassCustom custom = new ClassCustom();
			
			if(f.getName() == "cidadeAgencia" 
					|| f.getName() == "contaCorrente"
					|| f.getName() == "numAgencia"
					|| f.getName() == "operadorCef"
					|| f.getName() == "banco") {
				
				custom.setCampo(f.getName());
				custom.setMetodo(metodoName);
				
				camposMetodos.add(custom);
				metodos.add(metodoName);
			}
		}
	}
}
