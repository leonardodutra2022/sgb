package br.ufc.crateus.sgb.config;

import java.util.Arrays;
import java.util.Date;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;

import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.model.enums.Perfis;
import br.ufc.crateus.sgb.repository.UsuarioRepository;

/**
 * Classe de Configuração básica quando o sistema é rodado pela primeira vez basicamente
 * @author Leonardo Dutra
 * @see UsuarioRepository
 *
 */
@Configuration
public class InitConfig implements ApplicationListener<ApplicationReadyEvent> {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public void onApplicationEvent(ApplicationReadyEvent event) {
		setTimeZone();
		if(usuarioRepository.count() == 0)
			setUsuarioDefault();
	}
	
	void setTimeZone() {
		TimeZone.setDefault(TimeZone.getTimeZone("GMT-03:00"));
	}
	
	private void setUsuarioDefault() {
		Usuario usuario = new Usuario();
		usuario.setPapel("Administrador do Sistema");
		usuario.setNomeCompleto("Leonardo Dutra");
		usuario.setNomeUsuario("user");
		usuario.setSenha("pass");
		usuario.setEmail("mail");
		usuario.setDataHora(new Date());
		usuario.setSexo("1");
		usuario.setPerfils(Arrays.asList(Perfis.admin));
		
		usuarioRepository.save(usuario);
	}

}
