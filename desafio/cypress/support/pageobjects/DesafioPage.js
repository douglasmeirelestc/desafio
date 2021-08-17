/// <reference types="cypress" />

import Util from '../utilitarios/Util'

const util = new Util
const url = Cypress.config("baseUrl")

let data, mes;

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
    })

    VerificarMensagemDeErro = (() => {
        cy.get("#errorModal", { timeout: 50000 })
            .should('be.visible')
            .then(($erro) => {
            cy.wrap($erro).should('be.visible')
            if (Cypress.dom.isVisible($erro)){
                cy.get('#errorModal > .modal-footer > .btn')
                    .click()
            }
        })
    })

    SelecionarVooMilhas = (() => {
        cy.get("#flightsArticle0 div.checkbox label[for='optionMiles0']")
            .eq(0)
            .click()
    })

    ScrollarTela () {
        cy.scrollTo(0, 600)
        cy.get("#firstFlights > .segmentsFlightsTemplate > .smiles__flight-search > #flightsArticle0 > :nth-child(4) > .column-miles > .miles > [style='position:relative'] > .checkbox > .flightlb").should('be.visible').click();
    }
}
export default Desafio