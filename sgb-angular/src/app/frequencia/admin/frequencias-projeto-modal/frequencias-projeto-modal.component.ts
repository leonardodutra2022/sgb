import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { Aluno } from 'src/app/model/aluno';
import { PeriodoRegistroFrequenciaProjeto } from 'src/app/model/periodo.registro.frequencia.projeto';
import { Projeto } from 'src/app/model/projeto';
import { Usuario } from 'src/app/model/usuario';
import { FrequenciaRegistroService } from 'src/app/service/frequencia-registro.service';
import { FrequenciaService } from 'src/app/service/frequencia.service';
import { MessageToastrService } from 'src/app/service/message-toastr.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { AcompanhamentoDocenteComponent } from '../../responsavel/acompanhamento-docente/acompanhamento-docente.component';
import { PdfComponent } from '../../pdf/pdf.component';

class CheckFrequenciaAluno {
  public aluno: Aluno;
  public periodoRef;
  public projeto: Projeto;
}

@Component({
  selector: 'app-frequencias-projeto-modal',
  templateUrl: './frequencias-projeto-modal.component.html',
  styleUrls: ['./frequencias-projeto-modal.component.scss']
})
export class FrequenciasProjetoModalComponent implements OnInit {

  dados: any = '';

  idProjeto = '';

  projeto: Projeto = new Projeto();

  listaFrequenciasVinculadas: PeriodoRegistroFrequenciaProjeto[] = [];

  alunos: Aluno[] = [];

  checkFrequencias: CheckFrequenciaAluno[] = [];

  totalColunas = 0;

  downloadPdf = false;

  constructor(private iconRegistry: MatIconRegistry,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private frequenciaService : FrequenciaService,
    private frequenciaRegistroService: FrequenciaRegistroService,
    private sessaoService: SessaoService,
    public dialog : MatDialog,
    public toarstService: MessageToastrService) {}

  ngOnInit(): void {
    this.dados = this.data;
    this.idProjeto = this.data.projetoId;
    this.projeto = this.data.projeto
    this.listaFrequenciasVinculadas = this.data.frequenciasProjeto;
    this.getFrequenciasVinculadas(this.projeto);
    this.carregarAlunos();
    this.checkFrequenciaAluno(this.idProjeto);
  }

  checkFrequenciaAluno(idProjeto){
    this.frequenciaRegistroService
      .getFrequenciasRegistroByProjeto(idProjeto)
        .subscribe(
          list => {
            this.checkFrequencias = [];

            for(let fr of list){
              let chkFrequencia: CheckFrequenciaAluno = new CheckFrequenciaAluno()
              chkFrequencia.aluno = fr.aluno;
              chkFrequencia.projeto = fr.projeto;
              chkFrequencia.periodoRef = fr.periodoRef;

              this.checkFrequencias.push(chkFrequencia);
            }
          }
      );
  }

  checkAluno(idAluno, periodoRef): boolean {
    for(let item of this.checkFrequencias){
      if(item.aluno.id == idAluno && item.periodoRef == periodoRef){
        return true;
      }
    }
    return false;
  }

  getFrequenciasVinculadas(p: Projeto) {
    this.frequenciaRegistroService
      .getPeriodosAgrupadosByProjeto(p)
        .subscribe(
          dados => {
            this.listaFrequenciasVinculadas = dados;
          }
      );
  }

  carregarAlunos() {
    let usuarioLogado = this.sessaoService.getUsuarioLogado();
    if(usuarioLogado.papel == "Aluno"){
      let listaAlunosTemp = this.projeto.aluno;
      for(let a of listaAlunosTemp){
        if(a.siape == usuarioLogado.siape){
          this.alunos.push(a);
        }
      }
    }else{
      this.alunos = this.projeto.aluno;
    }
  }

  acompanhar(alu: Aluno, periodoFrequencia: PeriodoRegistroFrequenciaProjeto) {
    const dialogRef = this.dialog.open(AcompanhamentoDocenteComponent, {
      data: {
        aluno: alu,
        projeto: periodoFrequencia.projeto,
        periodoFrequencia: periodoFrequencia
      },
      maxWidth: "80%",
      maxHeight: "50%",
      position: {top: "3%"}
    });

    dialogRef.afterClosed().subscribe(
      result => {

     })
  }

  downloadPdfConfig(alu: Aluno, registroFrequencia: PeriodoRegistroFrequenciaProjeto){
    this.downloadPdf = true;
    this.checkValidPdf(registroFrequencia.projeto, alu, registroFrequencia);
  }

  openPdf(alu: Aluno, registroFrequencia: PeriodoRegistroFrequenciaProjeto) {
    this.downloadPdf = false;
    this.checkValidPdf(registroFrequencia.projeto, alu, registroFrequencia);
  }

  checkValidPdf(projeto: Projeto, alu: Aluno, registroFrequencia: PeriodoRegistroFrequenciaProjeto){

    // verificar registros de frequência
    this.frequenciaRegistroService
      .existsRegistrosFrequenciaByAlunoAndFrequencia(projeto, alu.id)
        .subscribe(
          res => {
            let existsRegistros = false;
            existsRegistros = res;

            // verificar se há rúbricas do responsável e aluno
            let existsRubricas = false;
            let usuarioAluno: Usuario = this.sessaoService.getUsuarioLogado();

            this.frequenciaService
              .verifyRubricas(projeto, alu.id)
              .subscribe(
                rub => {
                  existsRubricas = rub;
                  if(!rub){
                    this.toarstService.alertWarning("Não será possível gerar este documento PDF por alguma das seguintes possibilidades: O Responsável ou Aluno não possuem ainda Rúbrica Cadastrada");
                  }
                }
              );

              if(!res){
                this.toarstService.alertWarning("Não será possível gerar este documento PDF por alguma das seguintes possibilidades: Não existem registros de frequência para exibir");
              }else{
                if(existsRegistros){
                  if(!existsRubricas){
                    const dialogRef = this.dialog.open(PdfComponent, {
                      data: {
                        aluno: alu,
                        projeto: projeto,
                        registroFrequencia: registroFrequencia,
                        downloadPdf: this.downloadPdf
                      }
                    });
                
                    dialogRef.afterClosed().subscribe(
                      result => {
                
                     })
                  }
                }
             }
          }
      );
  }

// mudar a listagem de alunos, que não será mais por período, mas por projeto, vê em outros locais onde alterar essa parte
// aparentemente as funções afetadas são:
// 1. pesquisa avançada
// 2. controlador de frequencia no cadastro e outros
// 3. no front, em aluno-projeto-modal
// 4. frequencia-aluno-admin
// 5. frequencia-form

}
