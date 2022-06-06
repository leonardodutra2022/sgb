package br.ufc.crateus.sgb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.exception.RegisterExistException;
import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.repository.UsuarioRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Usuario
 * @author Leonardo Dutra
 * @see IValidation
 * @see Usuario
 * @see UsuarioRepository
 */
@Service
public class UsuarioService implements IValidation<Usuario> {

	@Autowired
	private UsuarioRepository usuarioRepository;
		
	
	public UsuarioService() {
//		this.usuarios = usuarioRepository.findAll();
	}
	
	public Usuario getByNomeUsuario(String nomeUsuario) {
		if(nomeUsuario == null) {
			return null;
		}else {
			Usuario u = usuarioRepository.findByNomeUsuario(nomeUsuario);
			return u; 
		}
	}
	
	@Override
	public boolean verifyFormat() {
		return false;
	}

	@Override
	public boolean verifySize() {
		return false;
	}

	@Override
	public boolean isNull() {
		return false;
	}

	
	@Override
	public boolean isExist(long id) {
	
	List<Usuario> usuarios = usuarioRepository.findAll();
		for(Usuario u : usuarios)
			if(u.getId() == id)
				return true;
					
		return false;
	}
	
	public boolean isExist(Long siape) {
		boolean result = false;
		List<Usuario> usuarios = usuarioRepository.findAll();
		if(usuarios.size() > 1) {
			for(Usuario u : usuarios) {
				if(u.getNomeUsuario() != "admin") {
					if(u.getSiape() == siape.longValue()) {
						result = true;
						break;
					}					
				}
			}			
		}
		return result;
	}

	@Override
	public Optional<Usuario> getById(long id) {
		Optional<Usuario> u = Optional.ofNullable(this.usuarioRepository.findById(id));
		if(u.isPresent()) {
			return u;
		}
		return u;
	}
	
	public boolean isExist(Usuario usuario)  throws RegisterExistException{
		String email = usuario.getEmail();
		String u = usuario.getNomeUsuario();
		
		Optional<Usuario> uEmail = usuarioRepository.findByEmail(email);
		Optional<Usuario> uNomeUsuario = Optional.ofNullable(usuarioRepository.findByNomeUsuario(u));
		
		try {
			
			if(uEmail.isPresent()) {
				new RegisterExistException();
				return true;
			}else if(uNomeUsuario.isPresent()) {
				new RegisterExistException();
				return true;
			}
			
		}catch(Exception e) {
		}
		return false;
	}
	
	public boolean checkCredencial(String u, String s){
		Usuario us = this.usuarioRepository.hasUser(u, s);
		if(us != null)
			return true;
		
		return false;
	}

}
