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
import br.ufc.crateus.sgb.model.MembroComissao;
import br.ufc.crateus.sgb.repository.MembroComissaoRepository;
import br.ufc.crateus.sgb.service.MembroComissaoService;

@RequestMapping("/api/comissao/membro")
@RestController
public class MembroComissaoController implements ICrud<MembroComissao>{
	
	@Autowired
	private MembroComissaoRepository membroRepository;
	
	@Autowired
	private MembroComissaoService membroService;
	
	@PostMapping
	@Override
	public ResponseEntity<MembroComissao> add(@RequestBody MembroComissao membroComissao) {
		membroRepository.save(membroComissao);
		return new ResponseEntity<MembroComissao>(membroComissao,HttpStatus.OK);
	}

	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<MembroComissao> update(@RequestBody MembroComissao membroComissao, @PathVariable long id) {
		if(membroService.isExist(id)) {
			membroComissao.setId(id);
			membroRepository.save(membroComissao);
			return new ResponseEntity<MembroComissao>(membroComissao,HttpStatus.OK);
		} 
		
		return new ResponseEntity<MembroComissao>(membroComissao,HttpStatus.NOT_FOUND);
	}

	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(membroService.isExist(id)) {
			membroRepository.deleteById(id);			
		}
	}

	@GetMapping
	@Override
	public ResponseEntity<List<MembroComissao>> getAll() {
		List<MembroComissao> lista = membroRepository.findAll();
		return new ResponseEntity<List<MembroComissao>>(lista,HttpStatus.OK);
	}

	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<MembroComissao> getById(@PathVariable long id) {
		MembroComissao membroComissao = membroRepository.findById(id);
		return new ResponseEntity<MembroComissao>(membroComissao,HttpStatus.OK);
	}

}
