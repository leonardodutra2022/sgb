package br.ufc.crateus.sgb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import br.ufc.crateus.sgb.model.InscricaoValidacao;
import br.ufc.crateus.sgb.repository.InscricaoValidacaoRepository;

/**
 * Controlador Rest para manejar API referentes a entidade InscricaoValidacao 
 * @author Leonardo Dutra
 * @see ICrud 
 * @see InscricaoValidacao
 * @see InscricaoValidacaoRepository
 */
@RequestMapping("/api/inscricao/validacao")
@RestController
public class InscricaoValidacaoController implements ICrud<InscricaoValidacao>{

	@Autowired
	private InscricaoValidacaoRepository iValidaRepository;
	
	@PostMapping
	@Override
	public ResponseEntity<InscricaoValidacao> add(@RequestBody InscricaoValidacao inscricaoValida) {
		iValidaRepository.save(inscricaoValida);
		return new ResponseEntity<InscricaoValidacao>(inscricaoValida,HttpStatus.OK);
	}

	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(iValidaRepository.existsById(id)) {
			iValidaRepository.deleteById(id);			
		}
	}

	@GetMapping
	@Override
	public ResponseEntity<List<InscricaoValidacao>> getAll() {
		List<InscricaoValidacao> lista = iValidaRepository.findAll();
		return new ResponseEntity<List<InscricaoValidacao>>(lista,HttpStatus.OK);
	}

	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<InscricaoValidacao> getById(@PathVariable long id) {
		InscricaoValidacao inscricaoValida = iValidaRepository.findById(id);
		return new ResponseEntity<InscricaoValidacao>(inscricaoValida,HttpStatus.OK);
	}
	
	@GetMapping("/search")
	public ResponseEntity<InscricaoValidacao> getByInscricao(@RequestParam long idInscricao){
		InscricaoValidacao inscricaoValida = iValidaRepository.findByInscricaoId(idInscricao);
		return new ResponseEntity<InscricaoValidacao>(inscricaoValida, HttpStatus.OK);
	}

	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<InscricaoValidacao> update(@RequestBody InscricaoValidacao inscricaoValida, @PathVariable long id) {
		if(iValidaRepository.existsById(id)) {
			inscricaoValida.setId(id);
			iValidaRepository.save(inscricaoValida);
			return new ResponseEntity<InscricaoValidacao>(inscricaoValida,HttpStatus.OK);
		} 
		
		return new ResponseEntity<InscricaoValidacao>(inscricaoValida,HttpStatus.NOT_FOUND);
	}

}
