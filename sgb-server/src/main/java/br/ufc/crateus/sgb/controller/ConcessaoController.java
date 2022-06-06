package br.ufc.crateus.sgb.controller;

import java.time.LocalDate;
import java.util.ArrayList;
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
import br.ufc.crateus.sgb.model.Concessao;
import br.ufc.crateus.sgb.repository.ConcessaoRepository;
import br.ufc.crateus.sgb.service.ConcessaoService;

/**
 * Controlador Rest para manejar API referentes a entidade Concessao 
 * @author Leonardo Dutra
 * @see ConcessaoRepository
 * @see ICrud
 * @see Concessao
 * @see ConcessaoService
 */
@RequestMapping("/api/beneficio/concessao")
@RestController
public class ConcessaoController implements ICrud<Concessao>{

	@Autowired
	private ConcessaoRepository concessoes;
	
	@Autowired
	private ConcessaoService concessaoService;
	
	@PreAuthorize("hasAuthority('add_concessao')")
	@PostMapping
	@Override
	public ResponseEntity<Concessao> add(@RequestBody Concessao obj) {
		if(!this.concessaoService.isExist(obj.getId())) {
			if(!this.concessaoService.hasConcessao(obj.getAluno().getId(), obj.getProcesso().getId())) {
				concessoes.save(obj);
				return new ResponseEntity<Concessao>(obj, HttpStatus.OK);
			}else {
				return new ResponseEntity<Concessao>(obj, HttpStatus.NOT_ACCEPTABLE);
			}
		}
		return new ResponseEntity<Concessao>(obj, HttpStatus.NOT_MODIFIED);
	}

	@PreAuthorize("hasAuthority('delete_concessao')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(concessaoService.isExist(id)) {
			concessoes.deleteById(id);			
		}		
	}

	@PreAuthorize("hasAuthority('view_concessao')")
	@GetMapping
	@Override
	public ResponseEntity<List<Concessao>> getAll() {
		List<Concessao> lista = concessoes.findAll();
		return new ResponseEntity<List<Concessao>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_concessao')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Concessao> getById(@PathVariable long id) {
		Concessao concessao = concessoes.findById(id);
		return new ResponseEntity<Concessao>(concessao,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_concessao')")
	@GetMapping("/search")
	public ResponseEntity<List<Concessao>> getAllByAlunoCpf(@RequestParam String cpf) {
		List<Concessao> concessao = concessoes.findAllByAlunoCpf(cpf);
		return new ResponseEntity<List<Concessao>>(concessao,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_concessao')")
	@GetMapping("/by")
	public ResponseEntity<List<Concessao>> getByAlunoId(@RequestParam Long alunoId) {
		List<Concessao> concessao = concessoes.findAllByAlunoId(alunoId);
		return new ResponseEntity<List<Concessao>>(concessao,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_concessao')")
	@GetMapping("/aluno")
	public ResponseEntity<List<Concessao>> getAllByAlunoId(@RequestParam Long id) {
		int anoAtual = LocalDate.now().getYear();
		int anoAnterior = anoAtual - 1;

		List<Concessao> concessaoFiltrada = new ArrayList<Concessao>();
		
		List<Concessao> concessaoList = concessoes.
				findAllByAlunoId(id);
		
		for(Concessao c : concessaoList) {
			if(c.getDataConcessao().getYear() == anoAtual 
					|| c.getDataConcessao().getYear() == anoAnterior)
				concessaoFiltrada.add(c);
		}
		
		return new ResponseEntity<List<Concessao>>(concessaoFiltrada,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_concessao')")
	@GetMapping("/concessao")
	public ResponseEntity<Concessao> getByAlunoAndProcesso(@RequestParam Long aluno, 
			@RequestParam Long processo) {
		Concessao concessao = concessoes.findByAlunoIdAndProcessoId(aluno,processo);
		return new ResponseEntity<Concessao>(concessao,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_concessao')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Concessao> update(@RequestBody Concessao obj, @PathVariable long id) {
		if(concessaoService.isExist(id)) {
//			obj.setId(id);
			concessoes.save(obj);
			return new ResponseEntity<Concessao>(obj,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Concessao>(obj,HttpStatus.NOT_FOUND);
	}

}
