package br.ufc.crateus.sgb.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import br.ufc.crateus.sgb.model.Arquivo;
import br.ufc.crateus.sgb.model.DocumentacaoArquivos;
import br.ufc.crateus.sgb.repository.DocumentacaoArquivosRepository;
import br.ufc.crateus.sgb.storage.ArquivoStorage;

/**
 * Controlador Rest para downlod de arquivos já armazenados com documentação de alunos
 * @author Leonardo Dutra
 * @see ArquivoStorage
 * @see DocumentacaoArquivosRepository
 */
@RequestMapping("/api/download")
@RestController
public class DownloadController {

	@Autowired
	private ArquivoStorage arquivoStorage;
		
	@Autowired
	private DocumentacaoArquivosRepository docArquivoRepository;
	
	@GetMapping("/arquivos")
	public void getAll(Model model) {
	   List<Arquivo> fileInfos = arquivoStorage.loadFiles().map(
	          path ->  {
	            String filename = path.getFileName().toString();
	            String url = MvcUriComponentsBuilder.fromMethodName(DownloadController.class,
	                            "downloadFile", path.getFileName().toString()).build().toString();
	            return new Arquivo(filename, url); 
	          } 
	        )
	        .collect(Collectors.toList());
	    
	    model.addAttribute("arquivos", fileInfos);
	    
//	    return "multipartfile/listfiles";
	  }
	  
	  @GetMapping("/{id}")
	  public ResponseEntity<Resource> download(@PathVariable long id) {
		DocumentacaoArquivos arquivoTemp = this.docArquivoRepository.findById(id);
		
		String nomeArquivo = arquivoTemp.getNomeArquivoFinal();
	    Resource file = arquivoStorage.loadFile(nomeArquivo);
	    
	    return ResponseEntity.ok()
	          .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
	          .body(file);  
	  }
	
}
