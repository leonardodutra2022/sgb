package br.ufc.crateus.sgb.controller;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.ufc.crateus.sgb.model.Documentacao;
import br.ufc.crateus.sgb.model.DocumentacaoArquivos;
import br.ufc.crateus.sgb.model.Inscricao;
import br.ufc.crateus.sgb.model.Processo;
import br.ufc.crateus.sgb.model.Recurso;
import br.ufc.crateus.sgb.model.enums.StatusEnum;
import br.ufc.crateus.sgb.repository.DocumentacaoArquivosRepository;
import br.ufc.crateus.sgb.repository.DocumentacaoRepository;
import br.ufc.crateus.sgb.repository.InscricaoRepository;
import br.ufc.crateus.sgb.repository.ProcessoRepository;
import br.ufc.crateus.sgb.repository.RecursoRepository;
import br.ufc.crateus.sgb.storage.ArquivoStorage;

/**
 * Controlador Rest para Upload de arquivos documentais 
 * @author Leonardo Dutra
 * @see ArquivoStorage
 * @see DocumentacaoArquivosRepository
 * @see ProcessoRepository
 * @see InscricaoRepository
 * @see DocumentacaoRepository
 * @see RecursoRepository
 * @see Recurso
 * @see DocumentacaoArquivos
 * @see Processo
 * @see Inscricao
 * @see Documentacao
 */
@RequestMapping("/api/upload")
@RestController
public class UploadController {

	@Autowired
	private ArquivoStorage arquivoStorage;
	
	@Autowired
	private DocumentacaoArquivosRepository docArquivoRepository;
	
	@Autowired
	private ProcessoRepository processoRepository;
	
	@Autowired
	private InscricaoRepository inscricaoRepository;
	
	@Autowired
	private DocumentacaoRepository documentoRepository;
	
	@Autowired
	private RecursoRepository recursoRepository;
	
	private Recurso recursoTemp = new Recurso();
	
	@PostMapping
	public ResponseEntity<DocumentacaoArquivos> upload(@RequestParam("arquivo") MultipartFile arquivo, @RequestParam String docTipo, 
			@RequestParam(required = false) Long inscricao, @RequestParam Long processo, 
			@RequestParam(required = false) String descricaoDoc, Model model, 
			@RequestParam(required = false) boolean isRecurso, 
			@RequestParam(required = false) Long recurso,
			@RequestParam(required = false) String fundamentacao) {
  		
		
		if(arquivo.getSize()/1000000 <= 11) {
			if(inscricao == null && processo != null) {
				saveDocProcesso(arquivo, docTipo, processo, descricaoDoc, model);
			}else {
				if(saveDoc(arquivo, inscricao, docTipo, processo, descricaoDoc, model)) {
					return new ResponseEntity<DocumentacaoArquivos>(new DocumentacaoArquivos(), HttpStatus.OK);
				}else {
					return new ResponseEntity<DocumentacaoArquivos>(new DocumentacaoArquivos(), HttpStatus.NOT_MODIFIED);
				}
			}
		}else {
			return new ResponseEntity<DocumentacaoArquivos>(new DocumentacaoArquivos(), HttpStatus.NOT_ACCEPTABLE);			
		}
		return new ResponseEntity<DocumentacaoArquivos>(new DocumentacaoArquivos(), HttpStatus.OK);
	}
	
	
	@PostMapping("/recurso")
	public ResponseEntity<?> uploadRecurso(
			@RequestParam(required = false) MultipartFile arquivo, 
			@RequestParam String docTipo, 
			@RequestParam(required = false) long inscricao, 
			@RequestParam long processo, 
			@RequestParam(required = false) String descricaoDoc, Model model, 
			@RequestParam(required = false) boolean isRecurso, 
			@RequestParam(required = false) Long recurso,
			@RequestParam(required = false) String fundamentacao) {
  		
		Processo processoSelecionado = this.processoRepository.findById(processo);		
		Inscricao inscricaoSelecionada = this.inscricaoRepository.findById(inscricao);
		
		if(arquivo != null) {
			if(arquivo.getSize()/1000000 <= 11) {
				if(saveDocRecurso(arquivo, inscricao, docTipo, processo, descricaoDoc, model, fundamentacao))
					return new ResponseEntity<Recurso>(recursoTemp, HttpStatus.OK);
				else
					return new ResponseEntity<Recurso>(recursoTemp, HttpStatus.NOT_MODIFIED);
			}else {
				return new ResponseEntity<Recurso>(recursoTemp, HttpStatus.NOT_ACCEPTABLE);
			}			
		}else {
		
			  recursoTemp = new Recurso();
			
			  recursoTemp.setDocArquivo(null);
			  recursoTemp.setDataHora(Date.from(Instant.now()));
			  recursoTemp.setFundamentacao(fundamentacao);
			  recursoTemp.setInscricao(inscricaoSelecionada);
			  recursoTemp.setProcesso(processoSelecionado);
			  recursoTemp.setParecer(StatusEnum.PENDENTE);
			  recursoTemp.setStatus(StatusEnum.ATIVO);
			  
			  recursoTemp = this.recursoRepository.save(recursoTemp);
			  
			  return new ResponseEntity<Recurso>(recursoTemp, HttpStatus.OK);			
		}
	}
	
	
	@GetMapping(value= "{id}")
	public ResponseEntity<Recurso> uploadRecurso(@RequestParam(required = false) Recurso recurso,
			 @PathVariable long id) {
		if(recursoRepository.existsById(id)) {
			return new ResponseEntity<Recurso>(recurso, HttpStatus.CREATED);
		}else {
			return new ResponseEntity<Recurso>(recurso, HttpStatus.NOT_MODIFIED);			
		}
	}	

	
	private boolean saveDoc(MultipartFile arquivo, long inscricao, String docTipo, long processo, String descricaoDoc, Model model) {

		Processo processoSelecionado = this.processoRepository.findById(processo);		
		Inscricao inscricaoSelecionada = this.inscricaoRepository.findById(inscricao);		
		Documentacao documentoSelecionado = this.documentoRepository.findByDocumento(docTipo);
		
		boolean st = false;
		
		if(docTipo == null || docTipo == "") {
			docTipo = "SEM_TIPO";
		}
		
		if(this.docArquivoRepository.findByInscricaoIdAndDocumentacaoDocumento(inscricao, docTipo) == null) {
			DocumentacaoArquivos docArquivo = new DocumentacaoArquivos();
			String extensaoArquivo = FilenameUtils.getExtension(arquivo.getOriginalFilename());
			
			docArquivo.setDescricao(descricaoDoc);
			docArquivo.setNomeArquivo(arquivo.getOriginalFilename());
			docArquivo.setFormatoArquivo(extensaoArquivo);
			
			docArquivo.setTamanhoArquivo(arquivo.getSize());
			docArquivo.setDataPostagem(LocalDate.now());
			docArquivo.setParaInscricao(true);
			docArquivo.setInscricao(inscricaoSelecionada);
			docArquivo.setProcesso(processoSelecionado);
			docArquivo.setParaProcesso(false);
			docArquivo.setParaRecurso(false);
			docArquivo.setPublico(false);
			docArquivo.setComum(false);
			docArquivo.setSituacaoDocumento(StatusEnum.ATIVO);
			docArquivo.setDocumentacao(documentoSelecionado);
			docArquivo.setDocTipo(docTipo);
			
	    	if(arquivo.getOriginalFilename().endsWith(".pdf") || arquivo.getOriginalFilename().endsWith(".PDF")) {
					String nomePadronizado = "";
					try {
			    		nomePadronizado = arquivoStorage.renameArquivo(arquivo,inscricao,docTipo);
						arquivoStorage.store(arquivo, nomePadronizado);
				        model.addAttribute("message", "File uploaded successfully! -> filename = " + arquivo.getOriginalFilename());
					}catch(Exception e) {
				        model.addAttribute("message", "Fail! -> uploaded filename: " + arquivo.getOriginalFilename());
					}
					
					docArquivo.setNomeArquivoFinal(nomePadronizado);
					DocumentacaoArquivos docTemp = this.docArquivoRepository.save(docArquivo);
					if(docTemp != null) {
						st = true;
					}
	    	}else {
	    		st = false;
	    	}
		}
		return st;
	}		
	
	private boolean saveDocRecurso(MultipartFile arquivo, long inscricao, String docTipo, 
				long processo, String descricaoDoc, Model model, String fundamentacao) {

		Processo processoSelecionado = this.processoRepository.findById(processo);		
		Inscricao inscricaoSelecionada = this.inscricaoRepository.findById(inscricao);		
		Documentacao documentoSelecionado = this.documentoRepository.findByDocumento(docTipo);

		
		DocumentacaoArquivos docArquivoTemp = this.docArquivoRepository
				.findByInscricaoIdAndDocumentacaoDocumento(inscricao, docTipo); 

		boolean st = false;
		
		if(docTipo == null || docTipo == "") {
			docTipo = "SEM_TIPO";
		}

		if(docArquivoTemp == null) {
			DocumentacaoArquivos docArquivo = new DocumentacaoArquivos();
			String extensaoArquivo = FilenameUtils.getExtension(arquivo.getOriginalFilename());
			
			docArquivo.setDescricao(descricaoDoc);
			docArquivo.setNomeArquivo(arquivo.getOriginalFilename());
			docArquivo.setFormatoArquivo(extensaoArquivo);
			
			docArquivo.setTamanhoArquivo(arquivo.getSize());
			docArquivo.setDataPostagem(LocalDate.now());
			docArquivo.setParaInscricao(false);
			docArquivo.setInscricao(inscricaoSelecionada);
			docArquivo.setProcesso(processoSelecionado);
			docArquivo.setParaProcesso(false);
			docArquivo.setParaRecurso(true);
			docArquivo.setPublico(false);
			docArquivo.setComum(false);
			docArquivo.setSituacaoDocumento(StatusEnum.ATIVO);
			docArquivo.setDocumentacao(documentoSelecionado);
			docArquivo.setDocTipo(docTipo);
			
	    	if(arquivo.getOriginalFilename().endsWith(".pdf") || arquivo.getOriginalFilename().endsWith(".PDF")) {
					String nomePadronizado = "";
					try {
			    		nomePadronizado = arquivoStorage.renameArquivoRecurso(arquivo, inscricao, docTipo, processo);
						arquivoStorage.store(arquivo, nomePadronizado);
				        model.addAttribute("message", "File uploaded successfully! -> filename = " + arquivo.getOriginalFilename());
					}catch(Exception e) {
				        model.addAttribute("message", "Fail! -> uploaded filename: " + arquivo.getOriginalFilename());
					}
				  
				  docArquivo.setNomeArquivoFinal(nomePadronizado);
				  DocumentacaoArquivos docTemp = this.docArquivoRepository.save(docArquivo);
				  
				  recursoTemp = new Recurso();
				  recursoTemp.setDocArquivo(docTemp);
				  recursoTemp.setDataHora(Date.from(Instant.now()));
				  recursoTemp.setFundamentacao(fundamentacao);
				  recursoTemp.setInscricao(inscricaoSelecionada);
				  recursoTemp.setProcesso(processoSelecionado);
				  recursoTemp.setParecer(StatusEnum.PENDENTE);
				  recursoTemp.setStatus(StatusEnum.ATIVO);
				  
				  recursoTemp = this.recursoRepository.save(recursoTemp);
				  if(recursoTemp != null)
					  st = true;
	    	}else {
	    		st = false;
	    	}
		}else if(!docArquivoTemp.isParaRecurso()){
			DocumentacaoArquivos docArquivo = new DocumentacaoArquivos();
			String extensaoArquivo = FilenameUtils.getExtension(arquivo.getOriginalFilename());
			
			docArquivo.setDescricao(descricaoDoc);
			docArquivo.setNomeArquivo(arquivo.getOriginalFilename());
			docArquivo.setFormatoArquivo(extensaoArquivo);
			
			docArquivo.setTamanhoArquivo(arquivo.getSize());
			docArquivo.setDataPostagem(LocalDate.now());
			docArquivo.setParaInscricao(false);
			docArquivo.setInscricao(inscricaoSelecionada);
			docArquivo.setProcesso(processoSelecionado);
			docArquivo.setParaProcesso(false);
			docArquivo.setParaRecurso(true);
			docArquivo.setPublico(false);
			docArquivo.setComum(false);
			docArquivo.setSituacaoDocumento(StatusEnum.ATIVO);
			docArquivo.setDocumentacao(documentoSelecionado);
			docArquivo.setDocTipo(docTipo);
			
	    	if(arquivo.getOriginalFilename().endsWith(".pdf") || arquivo.getOriginalFilename().endsWith(".PDF")) {
					String nomePadronizado = "";
					try {
			    		nomePadronizado = arquivoStorage.renameArquivo(arquivo,inscricao,docTipo);
						arquivoStorage.store(arquivo, nomePadronizado);
				        model.addAttribute("message", "File uploaded successfully! -> filename = " + arquivo.getOriginalFilename());
					}catch(Exception e) {
				        model.addAttribute("message", "Fail! -> uploaded filename: " + arquivo.getOriginalFilename());
					}
				  docArquivo.setNomeArquivoFinal(nomePadronizado);
				  this.docArquivoRepository.save(docArquivo);
				  st = true;
	    	}else {
	    		st = false;
	    	}
		}else {
			st = false;
		}
		
		return st;
	}
	
	private void saveDocProcesso(MultipartFile arquivo, String docTipo, long processo, String descricaoDoc, Model model) {

		Processo processoSelecionado = this.processoRepository.findById(processo);		
		Documentacao documentoSelecionado = this.documentoRepository.findByDocumento(docTipo);

		if(docTipo == null || docTipo == "") {
			docTipo = "SEM_TIPO";
		}
		
			DocumentacaoArquivos docArquivo = new DocumentacaoArquivos();
			String extensaoArquivo = FilenameUtils.getExtension(arquivo.getOriginalFilename());
			
			docArquivo.setDescricao(descricaoDoc);
			docArquivo.setNomeArquivo(arquivo.getOriginalFilename());
			docArquivo.setFormatoArquivo(extensaoArquivo);
			
			docArquivo.setTamanhoArquivo(arquivo.getSize());
			docArquivo.setDataPostagem(LocalDate.now());
			docArquivo.setParaInscricao(false);
			docArquivo.setProcesso(processoSelecionado);
			docArquivo.setParaProcesso(true);
			docArquivo.setParaRecurso(false);
			docArquivo.setPublico(false);
			docArquivo.setComum(false);
			docArquivo.setSituacaoDocumento(StatusEnum.ATIVO);
			docArquivo.setDocumentacao(documentoSelecionado);
			docArquivo.setDocTipo(docTipo);
		
	    	if(arquivo.getOriginalFilename().endsWith(".pdf") || arquivo.getOriginalFilename().endsWith(".PDF")) {
					String nomePadronizado = "";
					try {
			    		nomePadronizado = arquivoStorage.renameArquivoProcesso(arquivo,processo,docTipo);
						arquivoStorage.store(arquivo, nomePadronizado);
				        model.addAttribute("message", "File uploaded successfully! -> filename = " + arquivo.getOriginalFilename());
					}catch(Exception e) {
				        model.addAttribute("message", "Fail! -> uploaded filename: " + arquivo.getOriginalFilename());
					}
				  docArquivo.setNomeArquivoFinal(nomePadronizado);
				  this.docArquivoRepository.save(docArquivo);
	    	}
	}
}
