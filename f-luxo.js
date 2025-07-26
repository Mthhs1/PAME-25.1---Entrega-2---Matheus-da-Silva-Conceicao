//Declarando a classe reserva

class reserva {
    constructor(id_reserva, id_cliente, data_entrada, id_quarto) {
        this.id_cliente = id_cliente
        this.id_reserva = id_reserva
        this.data_entrada = data_entrada
        this.data_saida = null
        this.status = "Pendente"

        // Funcionario que confirmou/cancelou/adiou a reserva
        this.id_funcionario_entrada = null
        this.id_funcionario_saida = null

        // Quarto que a reserva foi feita
        this.id_quarto = id_quarto

    }

    // Funcao que confirma a realizacao de uma reserva por um funcionario
    confirmar_reserva(id_funcionario) {

        this.id_funcionario_entrada = id_funcionario_entrada
        this.status = "Realizada"
    }

    // Funcao que cancela uma reserva, sendo ela sendo pedente ou que ja foi confirmada
    cancelar_reserva(id_funcionario) {
        this.status = "Cancelada"
        this.id_funcionario_saida = id_funcionario
    }

    adiar_reserva(nova_data, id_funcionario) {

        //So sera feita o adiamento se a reserva for confirmada por um funcionario

        if (this.status == "Realizada" || this.status == "Adiada") {

            this.status = "Adiada"
            this.data_entrada = nova_data
            this.id_funcionario_entrada = id_funcionario_entrada

        }

    }

    confirmar_saida(id_funcionario) {
        this.status = "Finalizada"
        this.id_funcionario_saida = id_funcionario
    }

}

//Declarando a classe funcionario

class funcionario {
    constructor(id_funcionario) {
        let requisicao = require('readline-sync')

        let usuario = requisicao.question("Digite seu usuario: ")
        let senha = requisicao.question("Digite sua senha: ")
        let email = requisicao.question("Digite seu email: ")
        let cpf = requisicao.question("Digite seu cpf: ")
        let nome = requisicao.question("Digite seu nome completo: ")

        this.funcionario_usuario = usuario
        this.funcionario_senha = senha
        this.funcionario_email = email
        this.funcionario_cpf = cpf
        this.funcionario_nome = nome
        this.id_funcionario = id_funcionario

    }
}

//Declarando a classe cliente

class cliente {
    constructor(id_cliente) {

        let requisicao = require('readline-sync')

        let usuario = requisicao.question("Digite seu usuario: ")
        let senha = requisicao.question("Digite sua senha: ")
        let email = requisicao.question("Digite seu email: ")
        let data_nascimento = requisicao.question("Digite sua data de nascimento no formato dd/mm/aaaa: ")
        let cpf = requisicao.question("Digite seu cpf: ")
        let nome = requisicao.question("Digite seu nome completo: ")

        this.cliente_usuario = usuario
        this.cliente_senha = senha
        this.cliente_email = email
        this.cliente_cpf = cpf
        this.cliente_nome = nome
        this.id_cliente = id_cliente
        this.data_nascimento = data_nascimento
        this.reservas = []

    }
}

//Declarando a classe quartos

class quartos {
    constructor(id_quarto, quantidade_camas, valor_por_noite, garagem, tipo) {

        this.id_quarto = parseInt(id_quarto)
        this.nome = `Quarto ${id_quarto}`
        this.quantidade_camas = parseInt(quantidade_camas)
        this.valor_por_noite = parseFloat(valor_por_noite)
        this.garagem = garagem
        this.tipo = tipo
        this.descricao = `Quarto ${tipo} e ${garagem} garagem. Possui valor igual a ${valor} reais`
    }
}

//Declarando a classe sistema

class sistema {

    static id_funcionario = 0
    static id_cliente = 0
    static id_quarto = 0
    static id_reserva = 0
    static conjunto_de_numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    constructor() {
        this.clientes = []
        this.quartos = []
        this.reservas = []
        this.funcionarios = []
    }


    // Menu do sistema
    menu() {

        var requisicao = require('readline-sync')

        while (true) {

            console.log(`
            ------ Menu ------
            Escolha uma opcao
            1. Fazer login
            2. Fazer Cadastro
            3. Sair`)

            var opcao = requisicao.question("Escolha sua opcao: ")

            //Selecionou login
            if (opcao == "1") {
                while (true) {
                    console.log(`
                ------ Login ------
                Escolha uma opcao
                1. Login de Cliente
                2. Login de Funcionario
                3. Voltar`)

                    var opcao_login = requisicao.question("Escolha sua opcao: ")

                    if (opcao_login == "1") {

                    }

                    else if (opcao_login == "2") {

                    }

                    else if (opcao_login == "3") {
                        break
                    }
                    else {
                        console.log("Opçao invalida! Tente novamente")
                        console.log("\n".repeat(5))

                    }

                }

            }

            else if (opcao == "2") {
                while (true) {
                    console.log(`
                ------ Cadastro ------
                Escolha uma opcao
                1. Cadastro de Cliente
                2. Cadastro de Funcionario
                3. Voltar`)

                    var opcao_cadastro = requisicao.question("Escolha sua opcao: ")

                    if (opcao_login == "1") {

                    }

                    else if (opcao_login == "2") {

                    }

                    else if (opcao_login == "3") {
                        break
                    }
                    else {
                        console.log("Opçao invalida! Tente novamente")
                        console.log("\n".repeat(5))

                    }

                }

            }

            else if (opcao == "3") {
                break
            }
            else {
                console.log("Opçao invalida! Tente novamente")
                console.log("\n".repeat(5))

            }


        }

    }

    verificar_data_nascimento(pessoa) {

        let data_nascimento = pessoa.data_nascimento
        let tamanho = pessoa.data_nascimento.length

        console.log(data_nascimento, tamanho)


        if (tamanho != 10) {
            return true
        }

        for (let i = 0; i < tamanho; i++) {
            if (i == 2 || i == 5) {
                continue
            }

            else if (!(data_nascimento[i] in sistema.conjunto_de_numeros)) {
                console.log(`Data de Nascimento errada!! ${data_nascimento[i]}. Tente novamente!`)
                return true
            }
            else {
                continue
            }

        }

        console.log("Sem erro!")
        return false

    }

    cadastrando_cliente() {

        while (true) {
            console.log("\n".repeat(5))
            console.log("Vamos iniciar seu cadastro!")

            var possivel_cliente = new cliente(sistema.id_cliente)

            // var resposta_data_nascimento = this.verificar_data_nascimento(possivel_cliente)

            /*if (resposta_data_nascimento) {
                continue
            }
            */

            this.clientes.push(possivel_cliente)

            break

        }

    }

    cadastrando_funcionario() {

        while (true) {
            console.log("\n".repeat(5))
            console.log("Vamos iniciar seu cadastro!")

            var possivel_funcionario = new funcionario(sistema.id_funcionario)

            // var resposta_data_nascimento = this.verificar_data_nascimento(possivel_cliente)

            /*if (resposta_data_nascimento) {
                continue
            }*/

            this.funcionarios.push(possivel_funcionario)

            break

        }

    }

    // Funcao que ira verificar se o cpf é unico
    verificar_cpf() {

    }

    // Funcao que ira verificar se o usuario é unico
    verificar_usuario() {

    }

    // Funcao que controle o menu do cliente
    menu_cliente(cliente) {

        while (true) {
            console.log(`
            ------ Cliente ------
            Escolha uma opcao
            1. Ver meus dados
            2. Ver Lista de Quartos
            3. Fazer reserva
            4. Cancelar reserva
            5. Ver minhas reservas
            6. Desconectar`)

            var opcao_menu_cliente = requisicao.question("Escolha sua opcao: ")

            if (opcao_menu_cliente == "1") {

            }

            else if (opcao_menu_cliente == "2") {

            }

            else if (opcao_menu_cliente == "3") {

            }

            else if (opcao_menu_cliente == "4") {

            }

            else if (opcao_menu_cliente == "5") {

            }

            else if (opcao_menu_cliente == "6") {

            }

            else {
                console.log("Opçao invalida! Tente novamente")
                console.log("\n".repeat(5))

            }



        }

    }

    //Funcao que verifica se o cliente/funcionario fez uma senha forte (> 4 caracteres)
    senha_forte(){
        
    }

    //Funcao que controla o menu do funcionario
    menu_funcionario(){

    }
}


function funcao_geradora_de_quartos(id){
    
}



let sistema1 = new sistema
sistema1.menu()