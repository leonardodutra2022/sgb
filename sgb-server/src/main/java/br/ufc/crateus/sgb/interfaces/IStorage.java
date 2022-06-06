package br.ufc.crateus.sgb.interfaces;

import java.io.File;
import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/**
 * Interface contendo procedimentos padronizados para tratamento e manejo de arquivos  
 * @author Leonardo Dutra
 */
public interface IStorage {
	
	void store(MultipartFile file, String newName);
	
	Resource loadFile(String filename);
	
	void deleteAll();
	
	void init();
	
	Stream<Path> loadFiles();
	
	String renameArquivo(MultipartFile file, long inscricao, String docTipo);
	
	void delete(File arquivo);
	
	boolean jrxmlFileExists(String file);
	
	boolean jasperFileExists(String file);
	
	String loadJrxmlFile(String file);

	File loadJasperFile(String file);
}
