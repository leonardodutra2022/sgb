package br.ufc.crateus.sgb.storage;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import br.ufc.crateus.sgb.interfaces.IStorage;
import br.ufc.crateus.sgb.repository.DocumentacaoArquivosRepository;

/**
 * Serviço com procedimentos referentes manipulação, tratamento e armazenamento de arquivos em meio a upload ou download destes
 * @author Leonardo Dutra
 * @see IStorage
 * @see DocumentacaoArquivosRepository
 */
@Service
public class ArquivoStorage implements IStorage{
	
	Logger log = LoggerFactory.getLogger(this.getClass().getName());
	public static final Path ROOT_LOCATION = Paths.get("/home/npds/sgb/upload-docs");
//	public static final Path ROOT_LOCATION = Paths.get("C:\\Users\\Leo\\Desktop\\temp\\DOCS_UPLOAD");
	public static final Path REPORT_DIR = Paths.get("/home/npds/sgb/report");
//	public static final Path REPORT_DIR = Paths.get("C:\\Users\\Leo\\Desktop\\sgb\\relatorio_teste");
	
	@Autowired
	private DocumentacaoArquivosRepository docArquivoRepository;
	
	public ArquivoStorage() {
		
	}
	
	@Override
	public void store(MultipartFile file, String newName) {
	    try {
            Files.copy(file.getInputStream(), ROOT_LOCATION.resolve(newName));
        } catch (Exception e) {
          throw new RuntimeException("Algo errado! -> menssagem = " + e.getMessage());
        }		
	}

	@Override
	public Resource loadFile(String filename) {
        try {
            Path file = ROOT_LOCATION.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()) {
                return resource;
            }else{
              throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
          throw new RuntimeException("Error! -> message = " + e.getMessage());
        }
	}

	@Override
	public void deleteAll() {
		FileSystemUtils.deleteRecursively(ROOT_LOCATION.toFile());		
	}

	@Override
	public void delete(File arquivo) {
		FileSystemUtils.deleteRecursively(arquivo);
	}	
	
	@Override
	public void init() {
        try {
            Files.createDirectory(ROOT_LOCATION);
        } catch (IOException e) {
            throw new RuntimeException("Não pode inicializar armazenamento!");
        }
	}

	@Override
	public Stream<Path> loadFiles() {
        try {
            return Files.walk(ROOT_LOCATION, 1)
                .filter(path -> !path.equals(ROOT_LOCATION))
                .map(ROOT_LOCATION::relativize);
        }
        catch (IOException e) {
          throw new RuntimeException("\"Falha ao ler arquivo armazenado");
        }
	}

	@Override
	public String renameArquivo(MultipartFile file, long inscricao, String docTipo) {
		if(docTipo == null || docTipo == "") {
			docTipo = "SEM_TIPO";
		}
		String filename = inscricao + "_" + docTipo + "." + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
		return filename;

	}
	
	
	public String renameArquivoProcesso(MultipartFile file, long processo, String docTipo) {
		if(docTipo == null || docTipo == "") {
			docTipo = "SEM_TIPO";
		}
		String filename = "DOC_PROCESSO_" + processo + "_" + docTipo + "." + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
		return filename;

	}
	
	public String renameArquivoRecurso(MultipartFile file, long inscricao, String docTipo, long processo) {
		if(docTipo == null || docTipo == "") {
			docTipo = "SEM_TIPO";
		}
		long i = getCodeExtraArquivo(inscricao, processo, docTipo);
		
		String filename = "DOC[" + i++ + "]_RECURSO_" + inscricao + "_" + docTipo + "." + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
	    return filename;

	}

	public boolean docArquivoExist(long inscricao, long processo, String docTipo) {
		return this.docArquivoRepository.existsByInscricaoIdAndProcessoIdAndDocTipo(inscricao, processo, docTipo);
	}
	
	public long getCodeExtraArquivo(long inscricao, long processo, String docTipo) {
		return this.docArquivoRepository.countCustom(inscricao, processo, docTipo);
	}
	
	@Override
	public boolean jrxmlFileExists(String file) {
		Path reportFile = REPORT_DIR;
		reportFile = reportFile.resolve(file + ".jrxml");
		if (Files.exists(reportFile))
			return true;

		return false;
	}

	@Override
	public boolean jasperFileExists(String file) {
		Path reportFile = REPORT_DIR;
		reportFile = reportFile.resolve(file + ".jasper");
		if (Files.exists(reportFile))
			return true;
		return false;
	}

	@Override
	public String loadJrxmlFile(String file) {
		Path reportFile = REPORT_DIR;
		reportFile = reportFile.resolve(file + ".jrxml");
			return reportFile.toString();
	}

	@Override
	public File loadJasperFile(String file) {
		Path reportFile = REPORT_DIR;
		reportFile = reportFile.resolve(file + ".jasper");
		return reportFile.toFile();
	}

}
