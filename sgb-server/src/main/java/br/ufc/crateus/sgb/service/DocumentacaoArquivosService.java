package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.DocumentacaoArquivos;
import br.ufc.crateus.sgb.repository.DocumentacaoArquivosRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade DocumentacaoArquivos
 * @author Leonardo Dutra
 * @see IValidation
 * @see DocumentacaoArquivos
 * @see DocumentacaoArquivosRepository
 */
@Service
public class DocumentacaoArquivosService implements IValidation<DocumentacaoArquivos>{

	@Autowired
	private DocumentacaoArquivosRepository docArquivosRepository;
	
	@Override
	public boolean verifyFormat() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean verifySize() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isNull() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isExist(long id) {
		if(docArquivosRepository.findById(id) != null)
			return true;
		
		return false;
	}
	
	
	public boolean isExist(long inscricao, String docTipo) {
		if(docArquivosRepository.findByInscricaoIdAndDocumentacaoDocumento(inscricao, docTipo) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<DocumentacaoArquivos> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
