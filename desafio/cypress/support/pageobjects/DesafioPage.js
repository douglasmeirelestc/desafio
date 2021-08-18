/// <reference types="cypress" />

import Util from '../utilitarios/Util'

const util = new Util
const url = Cypress.config("baseUrl")

let data, mes, valorSelecionado = [], valorPedido = [];

class Desafio {
    AbrirBrowser(){
        cy.visit(url)
    }

    PreencherOrigemDestino = ((origem,destino) => {
        cy.get('#inputOrigin').type(origem, { force: true })
        cy.get("#inputDestination").type(destino, { force: true })
    })

    SelecionarDataOrigem = (() => {
        // mes = parseInt(util.PegarData().split('/')[1])-1
        // data = parseInt(util.PegarData().split('/')[0])+1

        cy.get('#_smilesflightsearchportlet_WAR_smilesbookingportlet_departure_date').click({ force: true })

        cy.get('tbody tr td a').then(datas => {
            cy.wrap(datas).eq(10).click({ force: true })
        })

        cy.get('tbody tr td a').then(datass => {
            cy.wrap(datass).eq(40).click({ force: true })
        })

        // cy.get(".ui-widget-content button:contains('Fechar')").click()
        cy.get("#ui-datepicker-div > div.ui-datepicker-buttonpane.ui-widget-content > button.ui-datepicker-current.ui-state-default.ui-priority-secondary.ui-corner-all")
            .click({ force: true })
    })

    ClicarBuscarVoo = (() => {
        cy.get("#submitFlightSearch").click({ force: true })

        cy.wait(10000)
        this.VerificarMensagemDeErro();
    })

    VerificarMensagemDeErro = (() => {
        cy.get("body", { timeout: 5000 }).then($body => {
            if ($body.find("#errorModal.fade.in").length > 0) {   
                cy.get("#errorModal.fade.in").then($header => {
                  if ($header.is(':visible')){
                    cy.get('#errorModal > .modal-footer > .btn')
                    .click({ force: true })
                  } else {
                    console.log("botão de erro não apareceu")
                  }
                });
            } else {
               assert.isOk('everything','Deu tudo certo?');
            }
        });
    })

    //Ao selecionar primeiro voo da lista 
    ///sem ser o voo com a tag "mais barato"
    //não é habilitado o resumo do pedido
    // SelecionarVooMilhas = (() => {
    //     cy.get("#flightsArticle0 div.checkbox label[for='optionMiles0']")
    //         .invoke('text')
    //         .then($preco => {
    //             valorSelecionado.push($preco)
    //         })
    //     cy.get("#flightsArticle0 div.checkbox label[for='optionMiles0']")
    //         .eq(0)
    //         .click()
    // })

    SelecionarVooMilhas = (() => {
        this.VerificarMensagemDeErro();

        cy.get("#bestFareCard button:contains('Selecionar tarifa')")
            .should('be.visible')
            .click()

        cy.get("#bestFareCard div.checkbox label[for='optionMiles0']")
            .eq(0)
            .invoke('text')
            .then($preco => {
                valorSelecionado.push($preco)
            })
        
        cy.get("#bestFareCard div.checkbox label[for='optionMiles0']")
            .eq(0)
            .click()
    })

    ScrollarTela = (() =>{
        cy.get("label[for='option1']:contains('Li e concordo com as')")
            .should('be.visible')
        
        this.CapturarValorPedido();

        cy.scrollTo(0,800)
    })

    CapturarValorPedido = (() => {
        cy.get("table.table.sub.miles > tbody > tr:nth-child(1) > th")
            .eq(1)
            .invoke('text')
            .then($valorPedido => {
                valorPedido.push($valorPedido)
            })
    })

    ValidarValor = (() => {
        expect(valorPedido[0]).equal(valorSelecionado[0].replaceAll('\t',"").replaceAll('\n',"").trim())
    })

    AceitarTermosDeAceite = (() => {
        cy.get("label[for='option1']:contains('Li e concordo com as')").click()
        cy.get("div.button a.hoverButtonActive")
            .should('be.visible')

        cy.get("div.button a.hoverButtonActive")
            .click()

        cy.get("div.main-content h3:contains('Acesse sua conta')")
            .should('be.visible')
    })
}
export default Desafio