package br.ufc.crateus.sgb.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.model.Horario;
import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.FrequenciaRegistro;
import br.ufc.crateus.sgb.model.Projeto;
import br.ufc.crateus.sgb.model.page.FrequenciaRegistroPage;
import br.ufc.crateus.sgb.model.page.criteria.FrequenciaRegistroCriteria;
import br.ufc.crateus.sgb.repository.custom.FrequenciaRegistroCustomRepository;
import br.ufc.crateus.sgb.utils.frequencia.PeriodoFrequenciaAluno;
import br.ufc.crateus.sgb.utils.frequencia.PeriodoFrequenciaProjeto;
import br.ufc.crateus.sgb.repository.FrequenciaRegistroRepository;
import br.ufc.crateus.sgb.repository.ProjetoRepository;


/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Frequencia
 * @author Leonardo Dutra
 * @see IValidation
 * @see FrequenciaRegistro
 * @see FrequenciaRegistroaRepository
 */
@Service
public class FrequenciaRegistroService implements IValidation<FrequenciaRegistro>{
	
	@Autowired
	private FrequenciaRegistroRepository frequenciaRegistroRepository;
	
	@Autowired
	private ProjetoRepository projetoRepository;
	
	private final FrequenciaRegistroCustomRepository frequenciaRegistroCustomRepository;
	
	public FrequenciaRegistroService(FrequenciaRegistroCustomRepository frequenciaRegistroCustomRepository) {
		this.frequenciaRegistroCustomRepository = frequenciaRegistroCustomRepository;
	}
	
	public Page<FrequenciaRegistro> getFrequenciaRegistrosPage(FrequenciaRegistroPage frequenciaRegistroPage, FrequenciaRegistroCriteria frequenciaRegistroCriteria){
		return this.frequenciaRegistroCustomRepository
				.findAllWithFilters(frequenciaRegistroPage, frequenciaRegistroCriteria);
	}
	
	@Override
	public boolean verifyFormat() {
		return false;
	}

	@Override
	public boolean verifySize() {
		return false;
	}

	@Override
	public boolean isNull() {
		return false;
	}

	@Override
	public boolean isExist(long id) {
		if(frequenciaRegistroRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<FrequenciaRegistro> getById(long id) {
		return null;
	}

	public boolean isExist(Long id) {
		return this.frequenciaRegistroRepository.existsById(id);
	}

	public boolean isExist(FrequenciaRegistro fr) {
		return this.frequenciaRegistroRepository
				.findByProjetoIdAndAlunoIdAndDiaRefAndMesRefAndAnoRef(fr.getProjeto().getId(), 
						fr.getAluno().getId(), fr.getDiaRef(), fr.getMesRef(), fr.getAnoRef())
				.isPresent();

	}
	
	public List<Horario> sortHorarios(List<Horario> horarios){
		Collections.sort(horarios);
		return horarios;
	}
	
	public List<FrequenciaRegistro> sortHorariosAllFrequencias(List<FrequenciaRegistro> listaInicial){
		List<FrequenciaRegistro> listaHorariosSort = new ArrayList<>();
		
		for(FrequenciaRegistro f: listaInicial) {
			f.setHorarios(sortHorarios(f.getHorarios()));
			listaHorariosSort.add(f);
		}
		return listaHorariosSort;
	}

	public List<PeriodoFrequenciaProjeto> periodosAgrupados() {
		List<Projeto> projetos = this.projetoRepository.findAll();
		
		List<PeriodoFrequenciaProjeto> listSort = new ArrayList<>();
		
		Map<String, PeriodoFrequenciaProjeto> periodosProjeto = new HashMap<String, PeriodoFrequenciaProjeto>();

		for(Projeto projeto : projetos) {
			List<FrequenciaRegistro> frequenciasRegistrosPeriodo = frequenciaRegistroRepository
					.customPeriodosProjetoDistinct(projeto.getId());
			
			for(FrequenciaRegistro fr: frequenciasRegistrosPeriodo) {
				PeriodoFrequenciaProjeto periodoFrequenciaProjeto = 
						new PeriodoFrequenciaProjeto(fr.getPeriodoRef(), 
								fr.getProjeto(), fr.getMesRef(), fr.getAnoRef(), 0);
				fr.setHorarios(sortHorarios(fr.getHorarios()));
				if(!periodosProjeto.containsKey(fr.getPeriodoRef()))
					periodosProjeto.put(fr.getPeriodoRef(), periodoFrequenciaProjeto);
			}
		}
		
		for(PeriodoFrequenciaProjeto f: periodosProjeto.values())
			listSort.add(f);
		
		Collections.sort(listSort);
		return listSort;

	}

	public List<PeriodoFrequenciaProjeto> periodosAgrupadosByProjeto(Long projetoId) {
		List<PeriodoFrequenciaProjeto> listSort = new ArrayList<>();
		
		List<FrequenciaRegistro> frequenciasRegistrosPeriodo = frequenciaRegistroRepository
				.customPeriodosProjeto(projetoId);
		
		Map<String, PeriodoFrequenciaProjeto> periodosProjeto = new HashMap<String, PeriodoFrequenciaProjeto>();
		
		for(FrequenciaRegistro fr: frequenciasRegistrosPeriodo) {
			PeriodoFrequenciaProjeto periodoFrequenciaProjeto = 
					new PeriodoFrequenciaProjeto(fr.getPeriodoRef(), 
							fr.getProjeto(), fr.getMesRef(), fr.getAnoRef(), 0);
			fr.setHorarios(sortHorarios(fr.getHorarios()));
			periodosProjeto.put(fr.getPeriodoRef(), periodoFrequenciaProjeto);
		}
		
		for(PeriodoFrequenciaProjeto f: periodosProjeto.values())
			listSort.add(f);
		
		Collections.sort(listSort);
		return listSort;
	}
	
	List<FrequenciaRegistro> getRegistrosPorAlunoMensalPeriodo(Long projeto, Long aluno, Integer mesRef, Integer anoRef){
		List<FrequenciaRegistro> lista = this.frequenciaRegistroRepository.findByProjetoIdAndAlunoIdAndMesRefAndAnoRef(projeto, aluno, mesRef, anoRef);
		List<FrequenciaRegistro> listaSort = new ArrayList<FrequenciaRegistro>();
		for(FrequenciaRegistro f: lista) {
			f.setHorarios(sortHorarios(f.getHorarios()));
			listaSort.add(f);
		}
		return listaSort;
	}
	
	public boolean hasRegistrosMensalPorAlunoNotAssignedByResponsavel(Long aluno, Long projeto, Integer mesRef, Integer anoRef) {
		List<FrequenciaRegistro> registros = getRegistrosPorAlunoMensalPeriodo(projeto, aluno, mesRef, anoRef);
		for(FrequenciaRegistro f: registros) {
			if(!f.isAssinaturaResponsavel())
				return true;
		}
		return false;
	}
	
	public boolean hasRegistrosMensalPorAluno(Long aluno, Long projeto, Integer mesRef, Integer anoRef) {
		List<FrequenciaRegistro> registros = getRegistrosPorAlunoMensalPeriodo(projeto, aluno, mesRef, anoRef);
		return registros.size() > 0;
	}
	
	public boolean assinarTodosRegistrosMensalPorAluno(Long aluno, Long projeto, Integer mesRef, Integer anoRef) {
		List<FrequenciaRegistro> registros = getRegistrosPorAlunoMensalPeriodo(projeto, aluno, mesRef, anoRef);
		for(FrequenciaRegistro f: registros) {
			f.setAssinaturaResponsavel(true);
			this.frequenciaRegistroRepository.save(f);
		}
		return true;
	}

	public Map<String, PeriodoFrequenciaAluno> getPeriodosProjetoAluno(Long alunoId, Long projetoId) {
		Map<String, PeriodoFrequenciaAluno> periodosProjetoAluno = new HashMap<String, PeriodoFrequenciaAluno>();
		
		List<FrequenciaRegistro> frequenciasRegistrosPeriodo = frequenciaRegistroRepository
				.customPeriodos(alunoId, projetoId);
		
		for(FrequenciaRegistro fr: frequenciasRegistrosPeriodo) {
			PeriodoFrequenciaAluno periodoFrequenciaProjetoAluno = 
					new PeriodoFrequenciaAluno(fr.getPeriodoRef(), 
							fr.getProjeto(), fr.getAluno(), fr.getMesRef(), fr.getAnoRef(), 0);
			fr.setHorarios(sortHorarios(fr.getHorarios()));
			periodosProjetoAluno.put(fr.getPeriodoRef(), periodoFrequenciaProjetoAluno);
		}
		return periodosProjetoAluno;
	}
}
