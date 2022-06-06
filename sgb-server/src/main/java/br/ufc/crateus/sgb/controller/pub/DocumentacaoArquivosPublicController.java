package br.ufc.crateus.sgb.controller.pub;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.model.DocumentacaoArquivos;
import br.ufc.crateus.sgb.repository.DocumentacaoArquivosRepository;

/**
 * Controlador Rest Pública para manejar API referentes a entidade DocumentacaoArquivos 
 * @author Leonardo Dutra
 * @see DocumentacaoArquivosRepository
 * @see DocumentacaoArquivos
 */
@RequestMapping("/public/api/documentacao/arquivos")
@RestController
public class DocumentacaoArquivosPublicController{

	@Autowired
	private DocumentacaoArquivosRepository docArquivoRepository;
	
	@GetMapping
	public ResponseEntity<List<DocumentacaoArquivos>> getAll() {
		List<DocumentacaoArquivos> lista = docArquivoRepository.findAll();
		return new ResponseEntity<List<DocumentacaoArquivos>>(lista,HttpStatus.OK);
	}

	@GetMapping(value="{id}")
	public ResponseEntity<DocumentacaoArquivos> getById(@PathVariable long id) {
		DocumentacaoArquivos docArquivo = docArquivoRepository.findById(id);
		return new ResponseEntity<DocumentacaoArquivos>(docArquivo,HttpStatus.OK);
	}
	
	@GetMapping("/getDocByProcesso")
	public ResponseEntity<List<DocumentacaoArquivos>> getAllByDocTipo(@RequestParam long processo, 
			@RequestParam String docTipo) {
		List<DocumentacaoArquivos> lista = docArquivoRepository
				.findByProcessoIdAndDocumentacaoDocumentoTipo(processo, docTipo);
		return new ResponseEntity<List<DocumentacaoArquivos>>(lista,HttpStatus.OK);
	}
	
	@GetMapping("/getDocsByProcesso")
	public ResponseEntity<List<DocumentacaoArquivos>> getDocsOficiaisByProcesso(@RequestParam long processo) {
		List<DocumentacaoArquivos> lista = docArquivoRepository
				.findDocsOficiaisByProcesso(processo);
		return new ResponseEntity<List<DocumentacaoArquivos>>(lista,HttpStatus.OK);
	}
	
	@GetMapping("/getDocsOficiais")
	public ResponseEntity<List<DocumentacaoArquivos>> getAllByDocsOficiais() {
		List<String> tipos = new ArrayList<String>();
		tipos.add("EDITAL");
		tipos.add("ADITIVO_EDITAL");
		tipos.add("PORTARIA");
		
		List<DocumentacaoArquivos> lista = docArquivoRepository.findDocs();
		return new ResponseEntity<List<DocumentacaoArquivos>>(lista,HttpStatus.OK);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<DocumentacaoArquivos>> getArquivosByProcesso(
			@RequestParam long processoId, @RequestParam String docTipo) {
		List<DocumentacaoArquivos> docsArquivos = docArquivoRepository.
				findByProcessoIdAndDocumentacaoDocumentoTipo(processoId, docTipo);
		return new ResponseEntity<List<DocumentacaoArquivos>>(docsArquivos,HttpStatus.OK);
	}

	@GetMapping("/")
	public ResponseEntity<DocumentacaoArquivos> getArquivosByInscricaoAndDocTipo(
			@RequestParam long inscricao, @RequestParam String docTipo) {
		DocumentacaoArquivos docArquivo= docArquivoRepository.
				findByInscricaoIdAndDocumentacaoDocumento(inscricao, docTipo);
		return new ResponseEntity<DocumentacaoArquivos>(docArquivo,HttpStatus.OK);
	}	
	
}
