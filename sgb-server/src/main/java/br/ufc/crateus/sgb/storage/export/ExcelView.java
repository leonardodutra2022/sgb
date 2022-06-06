package br.ufc.crateus.sgb.storage.export;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.WordUtils;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import br.ufc.crateus.sgb.model.enums.ListasExportEnum;
import br.ufc.crateus.sgb.utils.ClassUtils;
import br.ufc.crateus.sgb.utils.IClass;
import br.ufc.crateus.sgb.utils.ObjectUtils;

/**
 * Classe dedicada a gerar arquivo para exportação em formato XLS
 * @author Leonardo Dutra
 */
public class ExcelView extends AbstractXlsView implements IClass{

	ClassUtils classUtils = new ClassUtils();
	
	List<Method> metodosUteis = new ArrayList<Method>();
	List<Method> metodosSetados = new ArrayList<Method>();
	
	List<String> atributosUteis = new ArrayList<String>();
	List<String> atributosSetados = new ArrayList<String>();
	
	Map<ListasExportEnum, ObjectUtils> listaTemp = classUtils.getListaUtils();
	
	Sheet sheet = null;
	
	final String PREFIX_METHOD = "get";
	
	
	
	/**
	 * Método responsável por configurar e exportar a planilha
	 * @param model Classe do Spring para setar elementos para uso geral na aplicação
	 * @param workbook Objeto da classe Workbook para gerar uma Planilha
	 * @param request Servlet de requisição do spring
	 * @param response Servlet de resposta do spring
	 */
	@Override
	protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
			response.setHeader("Content-Disposition", "attachment; filename=\"arquivo.xls\"");
			
			ListasExportEnum itemSelect = (ListasExportEnum) model.get("itemLista");
			List<?> listaSelecionada = (List<?>) model.get("listaGeral");
			Object entidade = model.get("entidade");
			String tituloDoc = model.get("titulo").toString();

			Class<?> classEntidade = (Class<?>) entidade;
			ObjectUtils oUtils = listaTemp.get(itemSelect);
			
			@SuppressWarnings("unchecked")
			List<String> colunas = (List<String>) model.get("colunas");

			
			setPreferences(workbook, tituloDoc);
			setup(colunas, classEntidade, oUtils);
			setupCols(colunas);
			setupRows(colunas, listaSelecionada);
			
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
	
	
	
	/**
	 * Método responsável por setar configurações de estilo e preferências no documento a ser exportado
	 */
	void setPreferences(Workbook workbook, String tituloDoc) {
		sheet = workbook.createSheet(tituloDoc);
		sheet.setDefaultColumnWidth(30);
	}
	
	
	
	/**
	 * Método responsável por inserir os títulos dos campos em cada coluna de dados, de acordo com os campos requeridos pelo usuário, através da lista de input de colunas
	 * @param colunas Lista de colunas requeridas pelo usuário
	 */
	void setupCols(List<String> colunas) {
		int colCount = 0;
		Row header = sheet.createRow(colCount);
		for(String coluna : colunas) {
			header.createCell(colCount).setCellValue(coluna);
			colCount++;
		}
	}
	
	
	
	/**
	 * Método responsável por iterar linha a linha usando uma lista de registros da entidade requisitada pelo usuário, bem como um conjunto de colunas que serão montadas, 
	 * recebendo uma lista de objetos anônimos onde tais valores serão construídos de forma dinâmica para exportação
	 * @param listaSelecionada Lista de registros anônimos, a serem iterados no documento para exportar
	 * @param colunas Lista de colunas setadas pelo usuário
	 */
	void setupRows(List<String> colunas, List<?> listaSelecionada) {
		int row = 1;
		int colTotal = colunas.size();
		
		for(Object rowValue : listaSelecionada) {
			Row rowSheet =  sheet.createRow(row++);
			
			int cCount = 0;
			for(Method metodo : metodosSetados) {
				if(cCount == colTotal) {
					cCount = 0;
				}else {
					try {
						rowSheet.createCell(cCount).setCellValue(metodo.invoke(rowValue).toString());
						cCount++;
					} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

}
