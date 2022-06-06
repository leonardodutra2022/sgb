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
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.interfaces.ICrud;
import br.ufc.crateus.sgb.model.Comissao;
import br.ufc.crateus.sgb.repository.ComissaoRepository;
import br.ufc.crateus.sgb.service.ComissaoService;

@RequestMapping("/api/comissao")
@RestController
public class ComissaoController implements ICrud<Comissao>{

	@Autowired
	private ComissaoRepository comissaoRepository;
	
	@Autowired
	private ComissaoService comissaoService;
	
	@PostMapping
	@Override
	public ResponseEntity<Comissao> add(@RequestBody Comissao comissao) {
		comissaoRepository.save(comissao);
		return new ResponseEntity<Comissao>(comissao,HttpStatus.OK);
	}

	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Comissao> update(@RequestBody Comissao comissao, @PathVariable long id) {
		if(comissaoService.isExist(id)) {
			comissao.setId(id);
			comissaoRepository.save(comissao);
			return new ResponseEntity<Comissao>(comissao,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Comissao>(comissao,HttpStatus.NOT_FOUND);
	}

	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(comissaoService.isExist(id)) {
			comissaoRepository.deleteById(id);			
		}
	}

	@GetMapping
	@Override
	public ResponseEntity<List<Comissao>> getAll() {
		List<Comissao> lista = comissaoRepository.findAll();
		return new ResponseEntity<List<Comissao>>(lista,HttpStatus.OK);
	}

	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Comissao> getById(@PathVariable long id) {
		Comissao comissao = comissaoRepository.findById(id);
		return new ResponseEntity<Comissao>(comissao,HttpStatus.OK);
	}

}
