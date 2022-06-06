package br.ufc.crateus.sgb.config;


import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.model.enums.Perfis;
import br.ufc.crateus.sgb.service.LoginService;

/**
 * Classe que cria um provedor de autenticação específico para o sistema
 * @author Leonardo Dutra
 * @see LoginService
 */
@Component
public class AuthenticationProviderEspecify implements AuthenticationProvider{

	@Autowired
	private LoginService loginService;
		
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
		String nome = authentication.getName();
		Object dadosAcesso = authentication.getCredentials();
		
		if (!(dadosAcesso instanceof String)) {
			throw new BadCredentialsException("Senha inválida");
		}

		
		String senha = dadosAcesso.toString();
		
		Usuario usuarioTemp = null;
		
		try {
			usuarioTemp = loginService.realizarLogin(nome, senha);
			message(usuarioTemp.getNomeUsuario());
			Set<GrantedAuthority> autorizacoes = new HashSet<GrantedAuthority>();
			for(Perfis perfis : usuarioTemp.getPerfils()) {
				autorizacoes.addAll(perfis.getPermissoes());
			}
			
			return new UsernamePasswordAuthenticationToken(nome, senha, autorizacoes);
			
		}catch(NullPointerException e) {
			System.out.println("Dados não conferem para acesso [" + nome + "]");
		}
		

		return null;
		
	}

	private void message(String usuarioTemp){
		System.out.println("Usuario Logado ::: ==> " + " [" + usuarioTemp + "] => " + LocalDateTime.now());
	}
	
	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

	
	
}
