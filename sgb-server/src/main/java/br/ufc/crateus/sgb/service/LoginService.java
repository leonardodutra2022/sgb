package br.ufc.crateus.sgb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.repository.UsuarioRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Usuario e autenticação
 * @author Leonardo Dutra
 * @see UsuarioRepository
 * @see Usuario
 */
@Service
public class LoginService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	private Usuario usuarioSessao;
	
	public Usuario realizarLogin(String nomeUsuario, String senha) {
		usuarioSessao = usuarioRepository.hasUser(nomeUsuario, senha);
		return usuarioSessao;
	}
	
	public Usuario getUsuarioSessao() {
		return usuarioSessao;
	}
	
}
