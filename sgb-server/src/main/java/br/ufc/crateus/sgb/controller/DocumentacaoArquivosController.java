package br.ufc.crateus.sgb.controller;

import java.io.File;
import java.nio.file.Path;
import java.util.ArrayList;
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
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.DocumentacaoArquivos;
import br.ufc.crateus.sgb.model.Inscricao;
import br.ufc.crateus.sgb.model.Processo;
import br.ufc.crateus.sgb.repository.DocumentacaoArquivosRepository;
import br.ufc.crateus.sgb.repository.InscricaoRepository;
import br.ufc.crateus.sgb.repository.ProcessoRepository;
import br.ufc.crateus.sgb.service.DocumentacaoArquivosService;
import br.ufc.crateus.sgb.storage.ArquivoStorage;

/**
 * Controlador Rest para manejar API referentes a entidade DocumentacaoArquivos 
 * @author Leonardo Dutra
 * @see ICrud 
 * @see DocumentacaoArquivos
 * @see DocumentacaoArquivosRepository
 * @see DocumentacaoArquivosService
 * @see ArquivoStorage
 */
@RequestMapping("/api/documentacao/arquivos")
@RestController
public class DocumentacaoArquivosController implements ICrud<DocumentacaoArquivos>{

	@Autowired
	private DocumentacaoArquivosRepository docArquivoRepository;
	
	@Autowired
	private DocumentacaoArquivosService docArquivosService;
	
	@Autowired
	private InscricaoRepository inscricaoRepository;
	
	@Autowired
	private ProcessoRepository processoRepository;
	
	@Autowired
	private ArquivoStorage arquivoStorage;
	
	@PostMapping
	@Override
	public ResponseEntity<DocumentacaoArquivos> add(@RequestBody DocumentacaoArquivos docArquivo) {
//		if(!this.docArquivosService.isExist(docArquivo.getProcesso().getId(), 
//				docArquivo.getDocumentacao().getDocumento())) {
			docArquivoRepository.save(docArquivo);			
//		}
		return new ResponseEntity<DocumentacaoArquivos>(docArquivo,HttpStatus.OK);
	}

	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<DocumentacaoArquivos> update(@RequestBody DocumentacaoArquivos docArquivo, @PathVariable long id) {
		if(docArquivosService.isExist(id)) {
			docArquivo.setId(id);
			docArquivoRepository.save(docArquivo);
			return new ResponseEntity<DocumentacaoArquivos>(docArquivo,HttpStatus.OK);
		} 
		
		return new ResponseEntity<DocumentacaoArquivos>(docArquivo,HttpStatus.NOT_FOUND);
	}

	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(docArquivosService.isExist(id)) {
			DocumentacaoArquivos arquivoTemp = docArquivoRepository.findById(id);
			Path path = ArquivoStorage.ROOT_LOCATION;
			String uriArquivo = path.toString() + "/" + arquivoTemp.getNomeArquivoFinal();
			File file = new File(uriArquivo);
			
			docArquivoRepository.deleteById(id);
			arquivoStorage.delete(file);
		}
	}

	@GetMapping
	@Override
	public ResponseEntity<List<DocumentacaoArquivos>> getAll() {
		List<DocumentacaoArquivos> lista = docArquivoRepository.findAll();
		return new ResponseEntity<List<DocumentacaoArquivos>>(lista,HttpStatus.OK);
	}

	@GetMapping(value="{id}")
	@Override
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
		tipos.add("CRONOGRAMA");
		
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

	@GetMapping("/searchByProcesso")
	public ResponseEntity<List<DocumentacaoArquivos>> getByProcesso(
			@RequestParam long processoId) {
		List<DocumentacaoArquivos> docsArquivos = docArquivoRepository.
				findByProcessoIdAndParaProcessoTrue(processoId);
		return new ResponseEntity<List<DocumentacaoArquivos>>(docsArquivos,HttpStatus.OK);
	}
	
	@GetMapping("/searchByName")
	public ResponseEntity<List<DocumentacaoArquivos>> searchByFileName(
			@RequestParam String fileName) {
		List<DocumentacaoArquivos> docsArquivos = docArquivoRepository.
				findByNomeArquivo(fileName);
		return new ResponseEntity<List<DocumentacaoArquivos>>(docsArquivos,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<DocumentacaoArquivos> getArquivosByInscricaoAndDocTipo(
			@RequestParam long inscricao, @RequestParam String docTipo) {
		
		Inscricao iObj = inscricaoRepository.findById(inscricao);
		Aluno aluno = iObj.getAluno();
		Processo processo = iObj.getProcesso();
		List<Processo> processosUnificados = processoRepository.findByUnificado();
		
		DocumentacaoArquivos docArquivo = null;
		if(!processo.isUnificado()) {
			docArquivo = docArquivoRepository.
					findByInscricaoIdAndDocumentacaoDocumento(inscricao, docTipo);
		}else {
			List<Inscricao> inscricoes = new ArrayList<Inscricao>();
			
			Inscricao inscricaoTemp = null;
			for(Processo p : processosUnificados) {
				inscricaoTemp = this.inscricaoRepository.findByAlunoIdAndProcessoId(aluno.getId(), p.getId()); 
				if(inscricaoTemp != null) {
					inscricoes.add(inscricaoTemp);
				}
			}
			
			if(inscricoes.size() > 0) {
				for(Inscricao i : inscricoes) {
					docArquivo = docArquivoRepository.findByInscricaoIdAndDocumentacaoDocumento(i.getId(), docTipo);
					if(docArquivo != null)
						return new ResponseEntity<DocumentacaoArquivos>(docArquivo,HttpStatus.OK);
				}
			}else {
				return new ResponseEntity<DocumentacaoArquivos>(docArquivo,HttpStatus.OK);
			}
		}
		return new ResponseEntity<DocumentacaoArquivos>(docArquivo,HttpStatus.OK);
	}	

	@GetMapping("/inscricao")
	public ResponseEntity<List<DocumentacaoArquivos>> getArquivosByInscricao(
			@RequestParam long id) {
		List<DocumentacaoArquivos> docArquivos= docArquivoRepository.
				findByInscricaoId(id);
		return new ResponseEntity<List<DocumentacaoArquivos>>(docArquivos,HttpStatus.OK);
	}	
	
}
