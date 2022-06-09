import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/model/aluno';
import { AlunoService } from 'src/app/service/aluno.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { RecursoService } from 'src/app/service/recurso.service';
import { Subscription } from 'src/app/model/subscription';
import { Recurso } from 'src/app/model/recurso';
import { API_SGB } from 'src/app/config/API';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionValidationComponent } from '../subscription-validation/subscription-validation.component';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { ExportFileComponent } from 'src/app/export-file/export-file.component';
import { InscricaoDTO } from 'src/app/model/inscricaoDTO';
import { Processos } from 'src/app/model/processos';
import { Beneficio } from 'src/app/model/beneficio';
import { ProcessosService } from 'src/app/service/processos.service';

class AlunoCustom {
   id : number;
   nomeCompleto : string;
   matricula : string;
   cpf : string;
   cursoAtual : string;
   existInscricao : boolean;
   existRecurso : boolean;
   iValidacao : boolean;
   idProcesso : any;
   idInscricao : any;
   situacaoFinalInscricao : string;
   i : number = 1;
}

@Component({
  selector: 'app-subscription-submited',
  templateUrl: './subscription-submited.component.html',
  styleUrls: ['./subscription-submited.component.scss']
})
export class SubscriptionSubmitedComponent implements OnInit {

  listaAluno : Aluno[];
  listaInscricoesProcesso : Subscription[] = [];
  listaRecursosProcesso : Recurso[] = [];
  validacoes : InscricaoValidacao[] = [];
  listaAlunoCustom : AlunoCustom[];
  listaInscricoesCustom : InscricaoDTO[] = [];
  idProcesso: string = '';
  idInscricao : string = '';
  inscricao : Subscription = new Subscription();
  linkReport = '';
  processo : Processos = new Processos();
  beneficio : Beneficio = new Beneficio();
  

  constructor(private alunoService : AlunoService, 
              private rota : ActivatedRoute,
              private router : Router,
              private inscricaoService : SubscriptionService,
              private sessaoService : SessaoService,
              private recursoService : RecursoService,
              private dialog : MatDialog,
              private validaService : InscricaoValidacaoService,
              private processoService : ProcessosService) { }

  ngOnInit() {
    this.idProcesso = this.rota.snapshot.paramMap.get('id');
    this.getDados(this.idProcesso);
    this.linkReport = API_SGB + "/relatorio";
    this.getRecursos();
    this.getValidacoes();
  }

  getDados(idProcesso){
    this.processoService.
      getProcessosById(idProcesso).
        subscribe(
          p => {
            this.processo = p;
            this.beneficio = p.beneficio;
          }
        );
  }

  getAlunos(){
    this.alunoService.getAlunosGeral()
    .subscribe(dadosTemp => 
      {
        let tempList : AlunoCustom[] = [];
        let index = 1;
        for(let li of dadosTemp){
          let item : AlunoCustom = new AlunoCustom();
          item.cpf = li.cpf;
          item.id = li.id;
          item.matricula = li.siape;
          item.nomeCompleto = li.nomeCompleto;
          item.cursoAtual = li.cursoAtual;
          item.idProcesso = this.idProcesso;
          

          let inscricaoTemp : Subscription = null;
          if(this.listaInscricoesProcesso != []){
            for(let i of this.listaInscricoesProcesso){
              if(i != null && typeof i != 'undefined'){
                if(i.aluno.id == li.id){
                  inscricaoTemp = i;
                }
              }else{
                inscricaoTemp = new Subscription();
              }
            }
          }

          if(inscricaoTemp != null && typeof inscricaoTemp != 'undefined'){
            item.idInscricao = inscricaoTemp.id;
            item.existInscricao = true;
            item.situacaoFinalInscricao = inscricaoTemp.situacaoFinal;
          }else{
            item.existInscricao = false;
            item.idInscricao = null;
          }

          let recursoTemp : Recurso = null;
          
          if(this.listaRecursosProcesso != [] || this.listaRecursosProcesso != null || typeof this.listaRecursosProcesso != 'undefined'){
            for(let i of this.listaRecursosProcesso){
              if(i.inscricao.id == item.idInscricao){
                recursoTemp = i;
              }
            }
          }

          if(recursoTemp != null && typeof recursoTemp != 'undefined'){
            item.existRecurso = true;
          }else{
            item.existRecurso = false;
          }

          if(this.validacoes != [] || this.validacoes != null || typeof this.validacoes != 'undefined'){
            for(let i of this.validacoes){
              if(i.inscricao.id == item.idInscricao){
                if(i.dadosPessoaisCompleto && i.dadosContatosLogradouroCompleto && i.dadosAcadCompleto
                   && i.dadosMoradiaTransporteCompleto && i.dadosOutrosAuxiliosCompleto
                   && i.dadosSaudeDeficienciaCompleto && i.dadosSocioEconCompleto){
                    item.iValidacao = true;
                    item.i = index++;
                    tempList.push(item);
                }else{
                  item.iValidacao = false;
                }
              }
            }
          }
        }
        this.listaAlunoCustom = [];
        this.listaAlunoCustom = tempList;
      });
      
  }

  pageInscricao(id){
    this.router.navigate([`/inscricao/${id}`]);
  }

  getInscricoes() {
    this.inscricaoService
      .getInscricoesByProcesso(this.idProcesso)
        .subscribe(
          inscricoes =>
            {
                this.listaInscricoesProcesso = inscricoes;
                // this.getAlunos();
                
            }
        );
  }

  getInscricoesCustom() {
    this.inscricaoService
      .getInscricoesCustomByProcesso(this.idProcesso)
        .subscribe(
          inscricoesCustom =>
            {
                this.listaInscricoesCustom = inscricoesCustom;
                // this.getAlunos();
            }
        );
  }

  pageInscricaoValidacao(idInscricao){
    const dialogRef = this.dialog.open(SubscriptionValidationComponent, 
      {
        data: {
          idInscricao: idInscricao
        }
      });
    dialogRef.afterClosed().subscribe(
      result => {
    });
  }

  getRecursos(){
    this.recursoService
      .getRecursosByProcesso(this.idProcesso)
        .subscribe(
          dados => {
            this.listaRecursosProcesso = dados;
            this.getInscricoes(); 
            this.getInscricoesCustom();
          }
        );
  }

  getValidacoes(){
    this.validaService.
      getInscricoesValidadas().
        subscribe(
          lista => {
            this.validacoes = lista;
          }
        );
  }

  existRecursoByInscricao(id) : boolean{
    let st : boolean = false;
    this.recursoService
      .getRecursosByInscricao(id)
        .subscribe(
          dados => {
            if(dados != [] || dados != null || typeof dados != 'undefined')
              if(dados.length > 0)
                st = true;
                return st;
            }
        );
    return st;
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'INSCRICOES'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
