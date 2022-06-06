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
import br.ufc.crateus.sgb.model.InscricaoPendencia;
import br.ufc.crateus.sgb.model.enums.PendenciaEnum;
import br.ufc.crateus.sgb.repository.InscricaoPendenciaRepository;
import br.ufc.crateus.sgb.service.InscricaoPendenciaService;

/**
 * Controlador Rest para manejar API referentes a entidade InscricaoPendencia 
 * @author Leonardo Dutra
 * @see ICrud
 * @see InscricaoPendencia
 * @see InscricaoPendenciaRepository
 * @see InscricaoPendenciaService
 */
@RequestMapping("/api/inscricao/pendencia")
@RestController
public class InscricaoPendenciaController implements ICrud<InscricaoPendencia> {

	@Autowired
	private InscricaoPendenciaRepository inscricaoPendenciaRepository;
	
	@Autowired
	private InscricaoPendenciaService inscricaoPendenciaService;
	
	@PreAuthorize("hasAuthority('add_inscricao')")
	@PostMapping
	@Override
	public ResponseEntity<InscricaoPendencia> add(@RequestBody InscricaoPendencia inscricao) {
		inscricaoPendenciaRepository.save(inscricao);
		return new ResponseEntity<InscricaoPendencia>(inscricao,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_inscricao')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<InscricaoPendencia> update(@RequestBody InscricaoPendencia inscricao, @PathVariable long id) {
		if(inscricaoPendenciaService.isExist(id)) {
			inscricao.setId(id);
			inscricaoPendenciaRepository.save(inscricao);
			return new ResponseEntity<InscricaoPendencia>(inscricao,HttpStatus.OK);
		} 
		
		return new ResponseEntity<InscricaoPendencia>(inscricao,HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('delete_inscricao')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(inscricaoPendenciaService.isExist(id)) {
			inscricaoPendenciaRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping
	@Override
	public ResponseEntity<List<InscricaoPendencia>> getAll() {
		List<InscricaoPendencia> lista = inscricaoPendenciaRepository.findAll();
		return new ResponseEntity<List<InscricaoPendencia>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<InscricaoPendencia> getById(@PathVariable long id) {
		InscricaoPendencia inscricao = inscricaoPendenciaRepository.findById(id);
		return new ResponseEntity<InscricaoPendencia>(inscricao,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping("/search")
	public ResponseEntity<List<InscricaoPendencia>> getByInscricaoAndSt(@RequestParam long idInscricao){
		List<InscricaoPendencia> inscricoes = inscricaoPendenciaRepository
				.findByInscricaoIdAndConcluido(idInscricao, false);
		return new ResponseEntity<List<InscricaoPendencia>>(inscricoes, HttpStatus.OK);
		
	}
	
	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping("/searchByForm")
	public ResponseEntity<InscricaoPendencia> getByInscricaoAndForm(@RequestParam long idInscricao, 
			@RequestParam PendenciaEnum form){
		InscricaoPendencia inscricao = inscricaoPendenciaRepository
				.findByInscricaoIdAndConcluidoAndPendencia(idInscricao, false, form);
		return new ResponseEntity<InscricaoPendencia>(inscricao, HttpStatus.OK);
		
	}
	
	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping("/inscricao")
	public ResponseEntity<InscricaoPendencia> setConcluido(@RequestParam long id) {
		if(inscricaoPendenciaRepository.findByInscricaoId(id) != null) {
			InscricaoPendencia inscricaoTemp = inscricaoPendenciaRepository.findById(id);
			inscricaoTemp.setConcluido(true);
			inscricaoPendenciaRepository.save(inscricaoTemp);
			return new ResponseEntity<InscricaoPendencia>(inscricaoTemp,HttpStatus.OK);			
		}
		
		return new ResponseEntity<InscricaoPendencia>(new InscricaoPendencia(),HttpStatus.NOT_MODIFIED);
	}
	
}
