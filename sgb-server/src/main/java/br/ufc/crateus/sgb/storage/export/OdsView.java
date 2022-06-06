package br.ufc.crateus.sgb.storage.export;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.WordUtils;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import br.ufc.crateus.sgb.model.enums.ListasExportEnum;
import br.ufc.crateus.sgb.storage.export.abs.AbstractOdsView;
import br.ufc.crateus.sgb.utils.ClassUtils;
import br.ufc.crateus.sgb.utils.IClass;
import br.ufc.crateus.sgb.utils.ObjectUtils;

public class OdsView extends AbstractOdsView implements IClass{

	ClassUtils classUtils = new ClassUtils();
	
	List<Method> metodosUteis = new ArrayList<Method>();
	List<Method> metodosSetados = new ArrayList<Method>();
	
	List<String> atributosUteis = new ArrayList<String>();
	List<String> atributosSetados = new ArrayList<String>();
	
	Map<ListasExportEnum, ObjectUtils> listaTemp = classUtils.getListaUtils();
	
	ICsvBeanWriter csvWriter = null;
	String[] header = null;
	
	final String PREFIX_METHOD = "get";
	
	
	
	/**
	 * Método responsável por configurar e exportar em ODS tabulado
	 * @param model Classe do Spring para setar elementos para uso geral na aplicação
	 * @param request Servlet de requisição do spring
	 * @param response Servlet de resposta do spring
	 */
	@Override
	protected void buildOdsDocument(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		response.setHeader("Content-Disposition", "attachment; filename=\"arquivo.ods\"");
		
		ListasExportEnum itemSelect = (ListasExportEnum) model.get("itemLista");
		List<?> listaSelecionada = (List<?>) model.get("listaGeral");
		Object entidade = model.get("entidade");
		String tituloDoc = model.get("titulo").toString();
		Class<?> classEntidade = (Class<?>) entidade;
		ObjectUtils oUtils = listaTemp.get(itemSelect);
		
		@SuppressWarnings("unchecked")
		List<String> colunas = (List<String>) model.get("colunas");
		
		setup(colunas, classEntidade, oUtils);
		setPreferences(response);
		setHeader(tituloDoc,colunas);
		setRows(listaSelecionada, header);
		
		csvWriter.close();
	}
	
	
	
	/**
	 * Método responsável por setar configurações de estilo e preferências no documento a ser exportado
	 */
	void setPreferences(HttpServletResponse response) {
		try {
			csvWriter = new CsvBeanWriter(response.getWriter(),
			        CsvPreference.TAB_PREFERENCE);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	
	/**
	 * Método responsável por configurar o cabeçalho do arquivo a ser exportado, como título e campos de dados
	 * @param titulo Título recebido pré-configurado para inserir no título do arquivo
	 * @param colunas Lista de colunas setadas pelo usuário para serem usadas no arquivo para inputar
	 */
	void setHeader(String titulo, List<String> colunas) {
		try {
			header = new String[colunas.size()];
			for(int i = 0; i < colunas.size(); i++)
				header[i] = colunas.get(i);
			
			csvWriter.writeHeader(titulo);
			csvWriter.writeHeader(header);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	
	/**
	 * Método responsável por iterar linha a linha usando uma lista de registros da entidade requisitada pelo usuário, bem como um conjunto de colunas que serão montadas, 
	 * recebendo uma lista de objetos anônimos onde tais valores serão construídos de forma dinâmica para exportação
	 * @param lista Lista de registros anônimos, a serem iterados no documento para exportar
	 * @param header Header configurado
	 */
	void setRows(List<?> lista, String[] header) {

		for(Object row : lista) {
			try {
				csvWriter.write(row, header);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	
	/**
	 * Método responsável por configurar atributos existentes para uso, bem como métodos também, e predefinir nomemclatura dos mesmos para utilização 
	 * @param colunas Lista de colunas setadas pelo usuário
	 * @param classEntidade Entidade .class para uso quando necessário alguma inicialização ou verificação
	 * @param oUtils Classe de utilidades para uso quando se tratar de objetos em geral
	 */
	void setup(List<String> colunas, Class<?> classEntidade, ObjectUtils oUtils) {
		setListaAtributosUteis(classEntidade);
		setListaMetodosUteis(oUtils);

		for(String colunaSet : colunas) {
			String methodName = PREFIX_METHOD + WordUtils.capitalize(colunaSet);

			setMethods(methodName);
			setFields(colunaSet);
		}
	}
	
	
	
	/**
	 * Método responsável por criar lista de todos os campos disponíveis para uso, dependendo da entidade que o usuário selecionar
	 * @param classEntidade Entidade selecionada pelo usuário
	 */
	void setListaAtributosUteis(Class<?> classEntidade) {
		atributosUteis.clear();
		for(Field fi : getFields(classEntidade)) {	
			if(!(fi.getType() == boolean.class))
				atributosUteis.add(WordUtils.capitalize(fi.getName()));
		}
	}
	
	
	
	/**
	 * Método responsável por criar uma lista com todos os métodos disponíveis para uso, de acordo com a entidade solicitada
	 * @param oUtils Classe de utilidades acerca de qualquer objeto
	 */
	void setListaMetodosUteis(ObjectUtils oUtils) {
		metodosUteis.clear();
		for(Method me : oUtils.getMethods()) {	
			if(me.getName().startsWith(PREFIX_METHOD))
				metodosUteis.add(me);
		}
	}
	
	
	
	/**
	 * Método responsável por realizar busca por método requisitado e adicionar numa lista de métodos elencados para uso, com base na solicitação do usuário
	 * @param name Título do método para busca e posterior inclusão na lista
	 */
	void setMethods(String name) {
		for(Method m : metodosUteis) {
			if(m.getName().contentEquals(name)) {
				if(!metodosSetados.contains(m))
					metodosSetados.add(m);
			}
		}
	}
	
	
	
	/**
	 * Método responsável por lista os campos que o usuário requisitou para compor o documento, o método realiza uma busca e em seguida vai acrescentando na lista para posterior utilização
	 * @param name Título do campo para busca
	 */
	void setFields(String name) {
		for(String f : atributosUteis) {
			if(f.contentEquals(WordUtils.capitalize(name))) {
				if(!atributosSetados.contains(f))
					atributosSetados.add(f);
			}
		}
	}
}
