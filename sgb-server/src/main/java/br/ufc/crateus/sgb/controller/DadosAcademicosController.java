package br.ufc.crateus.sgb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.interfaces.ICrud;
import br.ufc.crateus.sgb.model.DadosAcademicos;
import br.ufc.crateus.sgb.repository.DadosAcademicosRepository;
import br.ufc.crateus.sgb.service.DadosAcademicosService;

/**
 * Controlador Rest para manejar API referentes a entidade DadosAcademicos 
 * @author Leonardo Dutra
 * @see ICrud
 * @see DadosAcademicos
 * @see DadosAcademicosRepository
 * @see DadosAcademicosService
 */
@RequestMapping("/api/aluno/dadosacademicos")
@RestController
public class DadosAcademicosController implements ICrud<DadosAcademicos>{

	@Autowired
	private DadosAcademicosRepository dadosAcadRepository;
	
	@Autowired
	private DadosAcademicosService dadosAcadService;
	
	@PreAuthorize("hasAuthority('add_dados_acad')")
	@PostMapping
	@Override
	public ResponseEntity<DadosAcademicos> add(@RequestBody DadosAcademicos dadosAcad) {
		if(dadosAcad != null) {
			if(!dadosAcadService.isExist(dadosAcad.getId()) || !dadosAcadService.isExistByAluno(dadosAcad.getAluno().getId())) {
				dadosAcadRepository.save(dadosAcad);
				return new ResponseEntity<DadosAcademicos>(dadosAcad,HttpStatus.OK);			
			}			
		}

			return new ResponseEntity<DadosAcademicos>(dadosAcad,HttpStatus.NOT_ACCEPTABLE);
	}

	@PreAuthorize("hasAuthority('edit_dados_acad')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<DadosAcademicos> update(@RequestBody DadosAcademicos dadosAcad, @PathVariable long id) {
		if(dadosAcadService.isExist(id)) {
			dadosAcad.setId(id);
			dadosAcadRepository.save(dadosAcad);
			return new ResponseEntity<DadosAcademicos>(dadosAcad,HttpStatus.OK);
		} 
		
		return new ResponseEntity<DadosAcademicos>(dadosAcad,HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('delete_dados_acad')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(dadosAcadService.isExist(id)) {
			dadosAcadRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_dados_acad')")
	@GetMapping
	@Override
	public ResponseEntity<List<DadosAcademicos>> getAll() {
		List<DadosAcademicos> lista = dadosAcadRepository.findAll();
		return new ResponseEntity<List<DadosAcademicos>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_dados_acad')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<DadosAcademicos> getById(@PathVariable long id) {
		DadosAcademicos dadosAcad = dadosAcadRepository.findById(id);
		return new ResponseEntity<DadosAcademicos>(dadosAcad,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_dados_acad')")
	@GetMapping("/search")
	public ResponseEntity<List<DadosAcademicos>> getByAluno(@RequestParam long aluno) {
		List<DadosAcademicos> dadosAcad = dadosAcadRepository.findByAlunoId(aluno);
		return new ResponseEntity<List<DadosAcademicos>>(dadosAcad,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_dados_acad')")
	@GetMapping("/getAllByCpf")
	public ResponseEntity<List<DadosAcademicos>> getAllByAlunoCpf(@RequestParam String cpf) {
		List<DadosAcademicos> dadosAcad = dadosAcadRepository.findAllByAlunoCpf(cpf);
		return new ResponseEntity<List<DadosAcademicos>>(dadosAcad,HttpStatus.OK);
	}
	
}
