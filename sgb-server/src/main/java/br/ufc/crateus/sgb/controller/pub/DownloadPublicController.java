package br.ufc.crateus.sgb.controller.pub;

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
 * Controlador Rest Público para download de arquivos já armazenados 
 * @author Leonardo Dutra
 * @see ArquivoStorage
 * @see DocumentacaoArquivosRepository
 * @see DocumentacaoArquivos
 */
@RequestMapping("/public/api/download")
@RestController
public class DownloadPublicController {

	@Autowired
	private ArquivoStorage arquivoStorage;
		
	@Autowired
	private DocumentacaoArquivosRepository docArquivoRepository;
	
	@GetMapping("/arquivos")
	public void getAll(Model model) {
	   List<Arquivo> fileInfos = arquivoStorage.loadFiles().map(
	          path ->  {
	            String filename = path.getFileName().toString();
	            String url = MvcUriComponentsBuilder.fromMethodName(DownloadPublicController.class,
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
		
		String nomeArquivo = "";
		
		if(arquivoTemp.getDocTipo() == "ADITIVO_EDITAL" || 
				arquivoTemp.getDocTipo() == "EDITAL" || 
				arquivoTemp.getDocTipo() == "PORTARIA" ||
				arquivoTemp.getDocTipo() == "CRONOGRAMA") {

			nomeArquivo = arquivoTemp.getNomeArquivo();
		}else {
			if(arquivoTemp.isParaInscricao()) {
				nomeArquivo = arquivoTemp.getInscricao().getId() + "_" + 
						arquivoTemp.getDocumentacao().getDocumento() + "." + arquivoTemp.getFormatoArquivo();				
			}else {
				nomeArquivo = "DOC_PROCESSO_" + arquivoTemp.getProcesso().getId() + "_" + 
						arquivoTemp.getDocTipo() + "." + arquivoTemp.getFormatoArquivo();				
			}			
		}

	    Resource file = arquivoStorage.loadFile(nomeArquivo);
	    
	    return ResponseEntity.ok()
	          .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
	          .body(file);  
	  }
	
}
