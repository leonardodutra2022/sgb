package br.ufc.crateus.sgb.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import br.ufc.crateus.sgb.model.Beneficio;
import br.ufc.crateus.sgb.model.Documentacao;
import br.ufc.crateus.sgb.repository.DocumentacaoRepository;
import br.ufc.crateus.sgb.service.DocumentacaoService;

/**
 * Controlador Rest para manejar API referentes a entidade Documentacao 
 * @author Leonardo Dutra
 * @see ICrud
 * @see Documentacao
 * @see DocumentacaoRepository
 * @see DocumentacaoService
 */
@RequestMapping("/api/documentacao")
@RestController
public class DocumentacaoController implements ICrud<Documentacao>{

	@Autowired
	private DocumentacaoRepository docRepository;
	
	@Autowired
	private DocumentacaoService docService;
	
	@PreAuthorize("hasAuthority('add_documentacao')")
	@PostMapping
	@Override
	public ResponseEntity<Documentacao> add(@RequestBody Documentacao doc) {
		docRepository.save(doc);
		return new ResponseEntity<Documentacao>(doc,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_documentacao')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Documentacao> update(@RequestBody Documentacao doc, @PathVariable long id) {
		
		if(docService.isExist(id)) {
			doc.setId(id);
			docRepository.save(doc);
			return new ResponseEntity<Documentacao>(doc,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Documentacao>(doc,HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('delete_documentacao')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(docService.isExist(id)) {
			docRepository.deleteById(id);			
		}		
	}

	@PreAuthorize("hasAuthority('view_documentacao')")
	@GetMapping
	@Override
	public ResponseEntity<List<Documentacao>> getAll() {
		List<Documentacao> lista = docRepository.findAllByOrderByDocumentoAsc();
		return new ResponseEntity<List<Documentacao>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_documentacao')")
	@GetMapping("/getByDoc")
	public ResponseEntity<List<Documentacao>> getAllByDocumentoTipo() {
		List<Documentacao> lista = docRepository.findAllByDocumentoTipo();
		return new ResponseEntity<List<Documentacao>>(lista,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_documentacao')")
	@GetMapping("/getByAuxilio")
	public ResponseEntity<Collection<Documentacao>> getAllByAuxilios(@RequestParam long beneficio) {
		List<Documentacao> ds = new ArrayList<>();
		Map<Long, Documentacao> docs = new HashMap<Long, Documentacao>();
		
		ds = this.docRepository.findAllByAtivoByOrderBySequenciaAsc();
		
		for(Documentacao d : ds) {
			List<Beneficio> bs = d.getBeneficios();
			for(Beneficio be : bs) {
				if(be.getId() == beneficio && !docs.containsKey(d.getId())) {
					docs.put(d.getId(), d);
				}
			}
		}
		
		Collection<Documentacao> result = new ArrayList<>();
		result = docs.values();
		
		return new ResponseEntity<Collection<Documentacao>>(result,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_documentacao')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Documentacao> getById(@PathVariable long id) {
		Documentacao doc = docRepository.findById(id);
		return new ResponseEntity<Documentacao>(doc,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_documentacao')")
	@GetMapping("/ativos")
	public ResponseEntity<List<Documentacao>> getAllAtivos() {
		List<Documentacao> lista = docRepository.findAllByAtivoByOrderByDocumentoAsc();
		return new ResponseEntity<List<Documentacao>>(lista,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_documentacao')")
	@GetMapping("/grupos")
	public ResponseEntity<List<Documentacao>> getAllGrupos() {
		List<Documentacao> lista = docRepository.findAllGrupoDoc();
		return new ResponseEntity<List<Documentacao>>(lista,HttpStatus.OK);
	}

}
