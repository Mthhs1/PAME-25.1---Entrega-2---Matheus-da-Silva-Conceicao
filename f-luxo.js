//Declarando a classe reserva

class reservaClasse {
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

        this.id_funcionario_entrada = id_funcionario
        this.status = "Confirmada"
    }

    // Funcao que cancela uma reserva, sendo ela sendo pedente ou que ja foi confirmada
    cancelar_reserva() {
        this.status = "Cancelada"
    }

    adiar_reserva(nova_data) {

        //So sera feita o adiamento se a reserva for confirmada

        if (this.status == "Confirmada") {

            this.status = "Adiada"
            this.data_entrada = nova_data

        }

    }

    confirmar_saida(data_saida, id_funcionario) {
        this.data_saida = data_saida
        this.status = "Finalizada"
        this.id_funcionario_saida = id_funcionario
    }

}

//Declarando a classe funcionario

class funcionarioClasse {
    constructor(id_funcionario, usuario, senha, email, cpf, nome) {

        this.funcionario_usuario = usuario
        this.funcionario_senha = senha
        this.funcionario_email = email
        this.funcionario_cpf = cpf
        this.funcionario_nome = nome
        this.id_funcionario = id_funcionario

    }
}

//Declarando a classe cliente

class clienteClasse {
    constructor(id_cliente, usuario, senha, email, cpf, nome, data_nascimento) {

        this.cliente_usuario = usuario
        this.cliente_senha = senha
        this.cliente_email = email
        this.cliente_cpf = cpf
        this.cliente_nome = nome
        this.id_cliente = id_cliente
        this.cliente_data_nascimento = data_nascimento

    }
}

//Declarando a classe quartos

class quartoClasse {
    constructor(id_quarto, quantidade_camas, valor_por_noite, garagem, tipo) {

        this.id_quarto = parseInt(id_quarto)
        this.nome = `Quarto ${id_quarto}`
        this.quantidade_camas = parseInt(quantidade_camas)
        this.valor_por_noite = parseFloat(valor_por_noite)
        this.garagem = garagem
        this.tipo = tipo
        this.descricao = `Quarto ${this.id_quarto}. Tipo ${this.tipo}, ${this.garagem} garagem e com ${this.quantidade_camas} camas. Possui valor por noite igual a ${this.valor_por_noite} reais`
        this.status = "Disponivel"
    }

    atualizarDescricao(){
        this.descricao = `Quarto ${this.id_quarto}. Tipo ${this.tipo}, ${this.garagem} garagem e com ${this.quantidade_camas} camas. Possui valor por noite igual a ${this.valor_por_noite} reais`
    }

    ocuparQuarto() {
        this.status = "Ocupado"
    }

    desocoparQuarto() {
        this.status = "Disponivel"
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

        //opcao para teste apenas

        this.clientes = []
        this.quartos = []
        this.reservas = []
        this.funcionarios = []
    }


    // Menu do sistema
    menu() {

        var teste_var_sistema = true

        if (teste_var_sistema) {

            // Adicionando os clientes ficticios ao sistema
            {
                var cliente_test_list = funcao_geradora_de_clientes(10)

                for (const cliente of cliente_test_list) {

                    var array_info_cliente_teste = [...[sistema.id_cliente], ...cliente]


                    var possivel_cliente = new clienteClasse(sistema.id_cliente, array_info_cliente_teste[1], array_info_cliente_teste[2], array_info_cliente_teste[3],
                        array_info_cliente_teste[4], array_info_cliente_teste[5], array_info_cliente_teste[6])

                    this.clientes.push(possivel_cliente)
                    sistema.id_cliente += 1
                }
            }

            // Adicionando os funcionarios ficticios ao sistema
            {
                var funcionario_test_list = funcao_geradora_de_funcionarios(5)

                for (const funcionario of funcionario_test_list) {

                    var array_info_funcionario_teste = [...[sistema.id_funcionario], ...funcionario]


                    var possivel_funcionario = new funcionarioClasse(sistema.id_funcionario, array_info_funcionario_teste[1], array_info_funcionario_teste[2],
                        array_info_funcionario_teste[3], array_info_funcionario_teste[4], array_info_funcionario_teste[5])

                    this.funcionarios.push(possivel_funcionario)
                    sistema.id_funcionario += 1
                }
            }

            // Adicionando os quartos ficticios ao sistema
            {
                var quarto_test_list = funcao_geradora_de_quartos(100)

                for (const quarto of quarto_test_list) {

                    var array_info_quarto_teste = [...[sistema.id_quarto], ...quarto]

                    var possivel_quarto = new quartoClasse(sistema.id_quarto, array_info_quarto_teste[1], array_info_quarto_teste[2],
                        array_info_quarto_teste[3], array_info_quarto_teste[4])

                    this.quartos.push(possivel_quarto)
                    sistema.id_quarto += 1
                }
            }

            // Adicionando os reservas ficticias ao sistema
            {
                var reserva_test_list = funcao_geradora_de_reservas(50)

                for (const reserva of reserva_test_list) {

                    var array_info_reserva_teste = [...[sistema.id_reserva], ...reserva]

                    var possivel_reserva = new reservaClasse(sistema.id_reserva, array_info_reserva_teste[1], array_info_reserva_teste[2],
                        array_info_reserva_teste[3])

                    this.reservas.push(possivel_reserva)
                    sistema.id_reserva += 1

                    let quarto = (this.quartos[array_info_reserva_teste[3]]).ocuparQuarto()

                }

            }

        }

        var requisicao = require('readline-sync')

        // loop infinito do menu
        while (true) {
            console.log("\n".repeat(5))
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

                    //Logar um Cliente
                    if (opcao_login == "1") {
                        this.efetuar_login("cliente")
                    }

                    //Logar um funcionario
                    else if (opcao_login == "2") {
                        this.efetuar_login("funcionario")
                    }

                    //Voltar ao menu anterior
                    else if (opcao_login == "3") {
                        break
                    }

                    //Opcao invalida
                    else {
                        console.log("Opçao invalida! Tente novamente")
                        console.log("\n".repeat(5))

                    }

                }

            }

            //Selecionou o Cadastro
            else if (opcao == "2") {
                while (true) {
                    console.log(`
                ------ Cadastro ------
                Escolha uma opcao
                1. Cadastro de Cliente
                2. Cadastro de Funcionario
                3. Voltar`)

                    var opcao_cadastro = requisicao.question("Escolha sua opcao: ")

                    // Cadastrar um cliente
                    if (opcao_cadastro == "1") {
                        var novo_cliente = this.cadastrando_cliente()

                        sistema.id_cliente += 1

                        console.log("Cliente Cadastrado!")

                        //Para verificar se ta tudo certinho com a lista de cliente
                        //console.log(this.clientes)
                        break
                    }

                    // Cadastrar um funcionario
                    else if (opcao_cadastro == "2") {

                        var novo_funcionario = this.cadastrando_funcionario()

                        sistema.id_funcionario += 1

                        console.log("Funcionario Cadastrado!")

                        //Para verificar se ta tudo certinho com a lista de cliente
                        //console.log(this.funcionarios)
                        break

                    }

                    // Voltar ao menu anterior
                    else if (opcao_cadastro == "3") {
                        break
                    }

                    //Opcao invalida
                    else {
                        console.log("Opçao invalida! Tente novamente")
                        console.log("\n".repeat(5))

                    }

                }

            }

            //Selecionou sair do sistema
            else if (opcao == "3") {
                break
            }

            //Opcao invalida de escolha
            else {
                console.log("Opçao invalida! Tente novamente")
                console.log("\n".repeat(5))

            }


        }

    }

    //Funcao que verifica se a data de nascimento foi digitada corretamente
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

    //Funcao que cadastra o cliente (utiliza a classe cliente)
    cadastrando_cliente() {

        while (true) {
            console.log("\n".repeat(5))
            console.log("Vamos iniciar seu cadastro!")

            let requisicao = require('readline-sync')
            var usuario = requisicao.question("Digite seu usuario: ")
            var senha = requisicao.question("Digite sua senha: ")
            var email = requisicao.question("Digite seu email: ")
            var data_nascimento = requisicao.question("Digite sua data de nascimento no formato dd/mm/aaaa: ")
            var cpf = requisicao.question("Digite seu cpf: ")
            var nome = requisicao.question("Digite seu nome completo: ")

            var possivel_cliente = new clienteClasse(sistema.id_cliente, usuario, senha, email, cpf, nome, data_nascimento)

            // var resposta_data_nascimento = this.verificar_data_nascimento(possivel_cliente)

            /*if (resposta_data_nascimento) {
                continue
            }
            */

            this.clientes.push(possivel_cliente)

            break

        }

    }

    //Funcao que cadastra o funciorio (utiliza a classe funcionario)
    cadastrando_funcionario() {

        while (true) {
            console.log("\n".repeat(5))
            console.log("Vamos iniciar seu cadastro!")

            let requisicao = require('readline-sync')

            var usuario = requisicao.question("Digite seu usuario: ")
            var senha = requisicao.question("Digite sua senha: ")
            var email = requisicao.question("Digite seu email: ")
            var cpf = requisicao.question("Digite seu cpf: ")
            var nome = requisicao.question("Digite seu nome completo: ")

            var possivel_funcionario = new funcionarioClasse(sistema.id_funcionario, usuario, senha, email, cpf, nome)

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
    menu_cliente(cliente_menu) {

        var requisicao = require("readline-sync")
        while (true) {
            console.log("\n".repeat(5))
            console.log(`
            ------ Cliente ------
            Escolha uma opcao
            1. Ver meus dados
            2. Ver Lista de Quartos disponiveis
            3. Fazer reserva
            4. Cancelar reserva
            5. Ver minhas reservas
            6. Desconectar`)

            var opcao_menu_cliente = requisicao.question("Escolha sua opcao: ")

            //Ver os dados
            if (opcao_menu_cliente == "1") {
                console.log("Aqui estao seus dados cadastrais!")
                console.log(`Nome: ${cliente_menu.cliente_nome}`)
                console.log(`Usuario: ${cliente_menu.cliente_usuario}`)
                console.log(`Senha: ${cliente_menu.cliente_senha}`)
                console.log(`CPF: ${cliente_menu.cliente_cpf}`)
                console.log(`Data de Nascimento: ${cliente_menu.cliente_data_nascimento}`)
                console.log(`Email: ${cliente_menu.cliente_email}`)
            }

            //Ver lista de quartos
            else if (opcao_menu_cliente == "2") {

                console.log("\n".repeat(5))
                for (const quarto of this.quartos) {
                    if (quarto.status == "Disponivel") {
                        console.log(quarto.descricao)
                    }
                    else {
                        continue
                    }

                }

            }

            //Fazer reserva
            else if (opcao_menu_cliente == "3") {

                while (true) {
                    console.log(`
                ------ Fazer reserva ------
                Dos quartos disponiveis, qual deseja fazer reserva?`)

                    var opcao_fazer_reserva = requisicao.question("Digite o numero do quarto ")
                    var encontrou_quarto_disponivel = false

                    if (typeof parseInt(opcao_fazer_reserva) == "number") {

                        var id_quarto = parseInt(opcao_fazer_reserva)

                        for (const quarto of this.quartos) {

                            //encontrou o quarto digitado
                            if (quarto.id_quarto == id_quarto) {

                                // Verificando se o quarto esta disponivel
                                if (quarto.status == "Disponivel") {

                                    //efetuando a reserva
                                    var opcao_data_reserva = requisicao.question("Insira a data desejada para a reserva: ")
                                    let possivel_reserva = new reservaClasse(sistema.id_reserva, cliente_menu.id_cliente, opcao_data_reserva, id_quarto)
                                    sistema.id_reserva += 1
                                    encontrou_quarto_disponivel = true

                                    console.log("Reserva efetuada com sucesso!")
                                    console.log("Aguarde um funcionario aprovar sua reserva!")
                                    this.reservas.push(possivel_reserva)
                                    quarto.ocuparQuarto()

                                    break

                                }

                            }


                        }

                        if (!encontrou_quarto_disponivel) {
                            console.log("Quarto ja ocupado!")
                            continue
                        }

                    }

                    else {
                        console.log("\n")
                        console.log("Valor digitado incorreto! Tente novamente!")
                        continue
                    }
                    break

                }
            }

            //cancelar reserva
            else if (opcao_menu_cliente == "4") {

                let encontrou_reserva = false
                console.log("\n".repeat(5))
                console.log("Dado as suas reservas: ")

                for (const reserva of this.reservas) {

                    if (reserva.id_cliente == cliente_menu.id_cliente) {

                        console.log(`Reserva numero ${reserva.id_reserva} para o dia ${reserva.data_entrada}`, 'do', `${(this.quartos[reserva.id_quarto]).descricao}. Status: ${reserva.status}`)
                        encontrou_reserva = true

                    }

                }

                if (!encontrou_reserva) {
                    console.log("Sem reserva encontrada")
                    continue
                }

                while (true) {

                    let opcao_cancelamento = requisicao.question("Escolha o numero da reserva que voce deseja fazer o cancelamento: ")

                    if ((typeof parseInt(opcao_cancelamento) == "number") && !(isNaN(parseInt(opcao_cancelamento)))) {

                        opcao_cancelamento = parseInt(opcao_cancelamento)

                        // Conferindo se aquela reserva é mesmo do cliente

                        let reserva = this.reservas[opcao_cancelamento]

                        if (reserva.id_cliente == cliente_menu.id_cliente) {

                            // Cancelando a reserva

                            reserva.cancelar_reserva()

                            // Mudando o status do quarto para disponivel
                            let quarto = this.quartos[reserva.id_quarto]
                            quarto.desocoparQuarto()

                            console.log("Reserva cancelada!")

                            break

                        }

                        else {
                            console.log("Essa reserva nao é sua! Tentenovamente")
                            console.log("\n")
                        }

                    }

                    else {
                        console.log("Opcao invalida! Tente novamente!")
                        console.log("\n")
                    }

                }

            }

            //Ver reservas
            else if (opcao_menu_cliente == "5") {

                let encontrou_reserva = false
                console.log("\n".repeat(5))
                console.log("Abaixo estao suas reservas!")

                for (const reserva of this.reservas) {

                    if (reserva.id_cliente == cliente_menu.id_cliente) {

                        console.log(`Reserva numero ${reserva.id_reserva} para o dia ${reserva.data_entrada}`, 'do', `${(this.quartos[reserva.id_quarto]).descricao}. Status: ${reserva.status}`)
                        encontrou_reserva = true

                    }

                }

                if (!encontrou_reserva) {
                    console.log("Sem reserva encontrada")
                }
            }

            else if (opcao_menu_cliente == "6") {

                console.log("Saindo da sua conta!")
                console.log("\n".repeat(5))
                break
            }

            else {
                console.log("Opçao invalida! Tente novamente")
                console.log("\n".repeat(5))

            }



        }

    }

    //Funcao que verifica se o cliente/funcionario fez uma senha forte (> 4 caracteres)
    senha_forte() {

    }

    //Funcao que controla o menu do funcionario
    menu_funcionario(funcionario_menu) {

        var requisicao = require("readline-sync")
        while (true) {
            console.log("\n".repeat(5))
            console.log(`
            ------ Funcionario ------
            Escolha uma opcao
            1. Ver meus dados
            2. Ver Lista de Quartos
            3. Ver lista de reservas
            4. Ver lista de clientes
            5. Mudar status da reserva
            6. Adicionar Quarto
            7. Editar Quarto
            8. Desconetar`)

            var opcao_menu_cliente = requisicao.question("Escolha sua opcao: ")

            //Ver os dados
            if (opcao_menu_cliente == "1") {
                console.log("\n".repeat(5))
                console.log("Aqui estao seus dados cadastrais!")
                console.log(`Nome: ${funcionario_menu.funcionario_nome}`)
                console.log(`Usuario: ${funcionario_menu.funcionario_usuario}`)
                console.log(`Senha: ${funcionario_menu.funcionario_senha}`)
                console.log(`CPF: ${funcionario_menu.funcionario_cpf}`)
                console.log(`Email: ${funcionario_menu.funcionario_email}`)
            }

            //Ver lista de quartos
            else if (opcao_menu_cliente == "2") {

                console.log("\n".repeat(5))
                console.log("Lista de Quartos")

                for (const quarto of this.quartos) {
                    console.log(quarto.descricao)
                }

            }

            //Ver lista de reservas
            else if (opcao_menu_cliente == "3") {

                console.log("\n".repeat(5))
                console.log("Lista de reservas Abaixo")
                for (const reserva of this.reservas) {

                    let id_cliente = reserva.id_cliente
                    let id_quarto = reserva.id_quarto


                    let cliente = this.clientes[id_cliente]
                    let quarto = this.quartos[id_quarto]


                    console.log(`Reserva do cliente ${cliente.cliente_nome} para o dia ${reserva.data_entrada} no Quarto ${quarto.id_quarto}. O status da reserva é: ${reserva.status} `)
                }

            }

            //Ver lista de clientes
            else if (opcao_menu_cliente == "4") {

                console.log("\n".repeat(5))
                console.log("Lista de clientes Abaixo")
                for (const cliente of this.clientes) {

                    let numero_de_reservas = 0

                    for (const reserva of this.reservas) {
                        if (reserva.id_cliente == cliente.id_cliente) {
                            numero_de_reservas += 1
                        }
                    }

                    console.log(`Nome: ${cliente.cliente_nome}, CPF: ${cliente.cliente_cpf}, Numero de reservas = ${numero_de_reservas} `)

                }

            }

            //Mudar status de reservas
            else if (opcao_menu_cliente == "5") {

                while (true) {

                    console.log("\n".repeat(5))
                    console.log(`
                ------ Funcionario ------
                Qual status deseja alterar?
                1. Aprovar uma reserva
                2. Adiar uma reserva
                3. Concluir uma reserva. (O cliente passou a noite)
                4. Voltar`)

                    let opcao_mudar_status = requisicao.question("Escolha sua opcao: ")

                    //Confirmando reserva
                    if (opcao_mudar_status == "1") {

                        console.log("\n".repeat(5))
                        console.log("Opcao de aprovar uma reserva escolhida!")

                        //Mostrando reservas
                        {
                            console.log("\n".repeat(5))
                            console.log("Lista de reservas pendentes Abaixo")
                            for (const reserva of this.reservas) {

                                let id_cliente = reserva.id_cliente
                                let id_quarto = reserva.id_quarto


                                let cliente = this.clientes[id_cliente]
                                let quarto = this.quartos[id_quarto]

                                if (reserva.status == "Pendente") {
                                    console.log(`Reserva de numero ${reserva.id_reserva} do cliente ${cliente.cliente_nome} para o dia ${reserva.data_entrada} no Quarto ${quarto.id_quarto}. O status da reserva é: ${reserva.status} `)
                                }

                            }

                        }

                        while (true) {

                            let opcao_mudar_status_aprovar = requisicao.question("Escolha a reserva a ser aprovada: ")

                            // Verificando o tipo do input
                            if ((typeof parseInt(opcao_mudar_status_aprovar) == "number") && !(isNaN(parseInt(opcao_mudar_status_aprovar)))) {


                                let id_reserva_aprovar = parseInt(opcao_mudar_status_aprovar)

                                // verificando se o numero passado esta dentro do esperado das reservas
                                if (id_reserva_aprovar < this.reservas.length) {

                                    let reserva = this.reservas[id_reserva_aprovar]

                                    // verificando se a reserva esta pendente
                                    if (reserva.status == "Pendente") {

                                        reserva.confirmar_reserva(funcionario_menu.id_funcionario)
                                        console.log("Reserva confirmada!")
                                        break

                                    }

                                    else {
                                        console.log("Essa reserva nao precisa ser aprovada! Tente novamente")
                                        console.log("\n")
                                        continue
                                    }

                                }

                                else {
                                    console.log("Esse valor de reserva é invalido! (Nao consta na base de dados)")
                                    console.log("\n")
                                    continue
                                }

                            }
                            else {
                                console.log("Entrada invalida! Tente novamente.")
                                console.log("\n")
                                continue
                            }

                        }

                    }

                    //Adiando reserva
                    else if (opcao_mudar_status == "2") {

                        console.log("\n".repeat(5))
                        console.log("Opcao de adiar uma reserva escolhida!")

                        //Mostrando reservas
                        {
                            console.log("\n".repeat(5))
                            console.log("Lista de reservas possiveis de ser adiada abaixo")
                            for (const reserva of this.reservas) {

                                let id_cliente = reserva.id_cliente
                                let id_quarto = reserva.id_quarto


                                let cliente = this.clientes[id_cliente]
                                let quarto = this.quartos[id_quarto]

                                if (reserva.status == "Confirmada") {
                                    console.log(`Reserva de numero ${reserva.id_reserva} do cliente ${cliente.cliente_nome} para o dia ${reserva.data_entrada} no Quarto ${quarto.id_quarto}. O status da reserva é: ${reserva.status} `)
                                }

                            }

                        }

                        while (true) {

                            let opcao_mudar_status_adiar = requisicao.question("Escolha a reserva a ser adiada: ")

                            // Verificando o tipo do input
                            if ((typeof parseInt(opcao_mudar_status_adiar) == "number") && !(isNaN(parseInt(opcao_mudar_status_adiar)))) {


                                let id_reserva_adiar = parseInt(opcao_mudar_status_adiar)

                                // verificando se o numero passado esta dentro do esperado das reservas
                                if (id_reserva_adiar < this.reservas.length) {

                                    let reserva = this.reservas[id_reserva_adiar]

                                    // verificando se a reserva esta confirmada
                                    if (reserva.status == "Confirmada") {

                                        console.log("\n")
                                        let data_mudar_status_adiar = requisicao.question("Digite a nova data para a reserva: ")
                                        reserva.adiar_reserva(data_mudar_status_adiar)
                                        console.log("Reserva adiada para esse data!")
                                        break

                                    }

                                    else {
                                        console.log("Nao é possivel de ser adiado essa reserva! Tente novamente")
                                        console.log("\n")
                                        continue
                                    }

                                }

                                else {
                                    console.log("Esse valor de reserva é invalido! (Nao consta na base de dados)")
                                    console.log("\n")
                                    continue
                                }

                            }
                            else {
                                console.log("Entrada invalida! Tente novamente.")
                                console.log("\n")
                                continue
                            }

                        }

                    }


                    else if (opcao_mudar_status == "3") {

                        console.log("\n".repeat(5))
                        console.log("Opcao de adiar uma reserva escolhida!")

                        //Mostrando reservas
                        {
                            console.log("\n".repeat(5))
                            console.log("Lista de reservas possiveis de ser finalizadas abaixo")
                            for (const reserva of this.reservas) {

                                let id_cliente = reserva.id_cliente
                                let id_quarto = reserva.id_quarto


                                let cliente = this.clientes[id_cliente]
                                let quarto = this.quartos[id_quarto]

                                if (reserva.status == "Confirmada" || reserva.status == "Adiada") {
                                    console.log(`Reserva de numero ${reserva.id_reserva} do cliente ${cliente.cliente_nome} para o dia ${reserva.data_entrada} no Quarto ${quarto.id_quarto}. O status da reserva é: ${reserva.status} `)
                                }

                            }

                        }

                        while (true) {

                            let opcao_mudar_status_finalizar = requisicao.question("Escolha a reserva a ser Finalizada!: ")

                            // Verificando o tipo do input
                            if ((typeof parseInt(opcao_mudar_status_finalizar) == "number") && !(isNaN(parseInt(opcao_mudar_status_finalizar)))) {


                                let id_reserva_finalizar = parseInt(opcao_mudar_status_finalizar)

                                // verificando se o numero passado esta dentro do esperado das reservas
                                if (id_reserva_finalizar < this.reservas.length) {

                                    let reserva = this.reservas[id_reserva_finalizar]

                                    // verificando se a reserva esta confirmada/adiada
                                    if (reserva.status == "Confirmada" || reserva.status == "Adiada") {

                                        console.log("\n")
                                        let data_mudar_status_finalizar = requisicao.question("Digite a data que o cliente saiu! (Lembre-se que o cliente so pode passar 1 dia nessa reserva): ")
                                        reserva.confirmar_saida(data_mudar_status_finalizar, funcionario_menu.id_funcionario)
                                        console.log("Reserva finalizada com sucesso!")
                                        break

                                    }

                                    else {
                                        console.log("Nao é possivel de finalizada essa reserva! Tente novamente")
                                        console.log("\n")
                                        continue
                                    }

                                }

                                else {
                                    console.log("Esse valor de reserva é invalido! (Nao consta na base de dados)")
                                    console.log("\n")
                                    continue
                                }

                            }
                            else {
                                console.log("Entrada invalida! Tente novamente.")
                                console.log("\n")
                                continue
                            }

                        }

                    }

                    else if (opcao_mudar_status == "4") {
                        break
                    }

                    else {
                        console.log("Opçao invalida! Tente novamente")
                        console.log("\n".repeat(5))
                    }

                }

            }

            //Adicionar quarto
            else if (opcao_menu_cliente == "6") {

                console.log("\n")
                console.log("Vamos criar um novo quarto entao!")

                // Escolhendo o tipo do quarto
                while (true) {

                    console.log("\n")
                    console.log("Qual vai ser o tipo do quarto?")
                    var opcao_tipo_quarto = requisicao.question("Normal ou Luxuoso? ")

                    if (opcao_tipo_quarto == "Luxuoso") {

                        console.log("Quarto luxuoso escolhido")
                        break

                    }

                    else if (opcao_tipo_quarto == "Normal") {

                        console.log("Quarto normal escolhido.")
                        break

                    }

                    else {

                        console.log("Opcao invalida! Tente novamente")
                        continue

                    }

                }

                //Escolhendo a garagem
                while (true) {

                    console.log("\n")
                    console.log("O quarto vai ter garagem?")
                    var opcao_tipo_garagem = requisicao.question("Com ou Sem? ")

                    if (opcao_tipo_garagem == "Com") {

                        console.log("Quarto com garagem escolhido.")
                        break

                    }

                    else if (opcao_tipo_garagem == "Sem") {

                        console.log("Quarto sem garagem escolhido.")
                        break
                    }

                    else {

                        console.log("Opcao invalida! Tente novamente")
                        continue

                    }

                }

                //escolhendo a quantidade de camas
                while (true) {

                    console.log("\n")
                    console.log("O quarto vai ter quantas camas?")
                    var opcao_tipo_camas = requisicao.question("Qual o numero de camas? ")

                    if (typeof parseInt(opcao_tipo_camas) == "number" && !(isNaN(parseInt(opcao_tipo_camas)))) {

                        opcao_tipo_camas = parseInt(opcao_tipo_camas)
                        break

                    }

                    else {

                        console.log("Opcao invalida! Tente novamente")
                        continue

                    }

                }

                //escolhendo a quantidade de preco
                while (true) {

                    console.log("\n")
                    console.log("Qual vai ser o preco do quarto?")
                    var opcao_tipo_preco = requisicao.question("Preco do quarto: ")

                    if (typeof parseInt(opcao_tipo_preco) == "number" && !(isNaN(parseInt(opcao_tipo_preco)))) {

                        opcao_tipo_preco = parseInt(opcao_tipo_preco)
                        break

                    }

                    else {

                        console.log("Opcao invalida! Tente novamente")
                        continue

                    }

                }

                let possivel_quarto = new quartoClasse(sistema.id_quarto, opcao_tipo_camas, opcao_tipo_preco, opcao_tipo_garagem, opcao_tipo_quarto)
                sistema.id_quarto += 1
                this.quartos.push(possivel_quarto)
                console.log("Quarto adicionado!")
                console.log("\n".repeat(2))

            }

            //Editar quarto
            else if (opcao_menu_cliente == "7") {

                console.log("\n")
                console.log("Veja a lista dos quartos abaixo!")

                var quarto = null

                for (const quarto of this.quartos) {
                    console.log(quarto.descricao)
                }

                while (true) {
                    var opcao_editar_quarto = requisicao.question("Dos quartos disponiveis, qual voce deseja alterar? ")

                    if (typeof parseInt(opcao_editar_quarto) && !(isNaN(parseInt(opcao_editar_quarto)))) {

                        opcao_editar_quarto = parseInt(opcao_editar_quarto)

                        if (opcao_editar_quarto < this.quartos.length) {

                            quarto = this.quartos[opcao_editar_quarto]
                            if (quarto.status != "Excluido") {

                                break

                            }

                            else {
                                console.log("Quarto excluido")
                                console.log("\n")
                                continue
                            }


                        }

                        else {
                            console.log("Esse quarto nao consta na base de dados!")
                            console.log("\n")
                            continue
                        }

                    }

                    else {

                        console.log("Entrada invalida! Tente novamente")
                        console.log("\n")
                        continue

                    }

                }

                while (true) {

                    console.log(quarto)

                    console.log("\n".repeat(5))
                    console.log(`
                    ------ Editar ------
                    Escolha o que editar do Quarto ${quarto.id_quarto}
                    1. Editar valor
                    2. Editar o tipo (Luxuoso/Normal)
                    3. Editar numero das camas
                    4. Editar garagem (Com/Sem)
                    5. Sair`)


                    var opcao_editar_quarto_escolhido = requisicao.question("Qual numero escolhido? ")

                    if (opcao_editar_quarto_escolhido == "1") {

                        var opcao_editar_quarto_escolhido_valor = requisicao.question("Qual e o novo valor do quarto? ")

                        if (typeof parseInt(opcao_editar_quarto_escolhido_valor) == "number" && !(isNaN(parseInt(opcao_editar_quarto_escolhido_valor)))) {

                            opcao_editar_quarto_escolhido_valor = parseInt(opcao_editar_quarto_escolhido_valor)
                            quarto.valor_por_noite = opcao_editar_quarto_escolhido_valor
                            console.log("Valor do quarto alterado!")
                            quarto.atualizarDescricao()
                            continue
                        }

                        else {
                            console.log("Opcao invalida! Tente novamente!")
                            console.log("\n")
                            continue
                        }

                    }

                    else if (opcao_editar_quarto_escolhido == "2") {

                        if (quarto.tipo == "Normal") {
                            quarto.tipo = "Luxuoso"
                            console.log("Tipo do quarto alterado para Luxuoso!")
                            quarto.atualizarDescricao()
                        }

                        else if (quarto.tipo == "Luxuoso") {
                            quarto.tipo = "Normal"
                            console.log("Tipo do quarto alterado para Normal")
                            quarto.atualizarDescricao()
                        }

                    }

                    else if (opcao_editar_quarto_escolhido == "3") {

                        var opcao_editar_quarto_escolhido_camas = requisicao.question("Qual e o novo numero de camas do quarto? ")

                        if (typeof parseInt(opcao_editar_quarto_escolhido_camas) == "number" && !(isNaN(parseInt(opcao_editar_quarto_escolhido_camas)))) {

                            opcao_editar_quarto_escolhido_camas = parseInt(opcao_editar_quarto_escolhido_camas)
                            quarto.quantidade_camas = opcao_editar_quarto_escolhido_camas
                            console.log("Valor da quantidade de camas do quarto alterado!")
                            quarto.atualizarDescricao()
                            continue
                        }

                        else {
                            console.log("Opcao invalida! Tente novamente!")
                            console.log("\n")
                            continue
                        }

                    }

                    else if (opcao_editar_quarto_escolhido == "4") {

                            if (quarto.garagem == "Com") {
                            quarto.garagem = "Sem"
                            console.log("Quarto alterado para sem garagem!")
                            quarto.atualizarDescricao()
                        }

                        else if (quarto.garagem == "Sem") {
                            quarto.garagem = "Com"
                            console.log("Quarto alterado para com garagem!")
                            quarto.atualizarDescricao()
                        }

                    }

                    else if (opcao_editar_quarto_escolhido == "5") {
                        console.log("\n")
                        break
                    }

                    else {
                        console.log("Opcao invalida! Tente novamente!")
                        console.log("\n")
                    }

                }

            }

            else if (opcao_menu_cliente == "8") {

                console.log("Saindo da sua conta!")
                console.log("\n".repeat(5))
                break
            }

            else {
                console.log("Opçao invalida! Tente novamente")
                console.log("\n".repeat(5))

            }



        }

    }

    efetuar_login(usuario) {


        var login_feito = false
        var requisicao = require("readline-sync")

        //Bloco de codigo que faz o login do cliente
        if (usuario == "cliente") {
            while (true) {
                console.log("\n".repeat(5))
                console.log(`
                ------ Funcionario (login) ------`)

                var usuario = requisicao.question("Digite seu usuario: ")
                var senha = requisicao.question("Digite sua senha: ")

                for (const cliente_teste of this.clientes) {

                    if (usuario == cliente_teste.cliente_usuario) {

                        if (senha == cliente_teste.cliente_senha) {
                            console.log("Login efetuado com sucesso!")
                            this.menu_cliente(cliente_teste)
                            login_feito = true
                            break
                        }
                    }

                    if (login_feito) {
                        break
                    }

                }

                if (login_feito) {
                    break
                }

                console.log("Usuario ou senha errados! Tente novamente")
                continue

            }
        }

        //Bloco de codigo que faz o login do funcionario
        if (usuario == "funcionario") {
            while (true) {
                console.log("\n".repeat(5))
                console.log(`
                ------ Funcionario (login) ------`)

                var usuario = requisicao.question("Digite seu usuario: ")
                var senha = requisicao.question("Digite sua senha: ")

                for (const funcionario_teste of this.funcionarios) {

                    if (usuario == funcionario_teste.funcionario_usuario) {

                        if (senha == funcionario_teste.funcionario_senha) {
                            console.log("Login efetuado com sucesso!")
                            this.menu_funcionario(funcionario_teste)
                            login_feito = true
                            break
                        }
                    }

                    if (login_feito) {
                        break
                    }


                }

                if (login_feito) {
                    break
                }

                console.log("Usuario ou senha errados! Tente novamente")
                continue

            }
        }
    }
}


function funcao_geradora_de_quartos(quantidade) {

    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    let quarto_list = []

    for (let i = 0; i < quantidade; i++) {
        let quarto = []
        quarto.push(`${getRandomInt(1, 4)}`)
        quarto.push(`${getRandomInt(100, 200)}`)

        let garagem = getRandomInt(0, 2)

        if (garagem == 0) {
            quarto.push("Sem")
        }
        else if (garagem == 1) {
            quarto.push("Com")
        }

        let tipo = getRandomInt(0, 2)

        if (tipo == 0) {
            quarto.push("Normal")
        }
        else if (tipo == 1) {
            quarto.push("Luxuoso")
        }

        quarto_list.push(quarto)
    }

    return quarto_list

}

function funcao_geradora_de_clientes(quantidade) {

    let clientes_list = []

    for (let i = 0; i < quantidade; i++) {
        let cliente = []
        cliente.push(`${i}${i}${i}`)
        cliente.push(`${i}`)
        cliente.push(`${i}@gmail.com`)
        cliente.push(`${i}${i}${i}-${i}${i}${i}`)
        cliente.push(`Cliente ${i}`)
        cliente.push(`0${i}/0${i}/${i}${i}${i}${i}`)

        clientes_list.push(cliente)
    }

    return clientes_list
}

function funcao_geradora_de_funcionarios(quantidade) {

    let funcionario_list = []

    for (let i = 0; i < quantidade; i++) {
        let funcionario = []
        funcionario.push(`${i}${i}`)
        funcionario.push(`${i}`)
        funcionario.push(`${i}${i}@gmail.com`)
        funcionario.push(`${i}${i}${i}${i}-${i}${i}${i}${i}`)
        funcionario.push(`Funcionario ${i}`)

        funcionario_list.push(funcionario)
    }

    return funcionario_list
}

function funcao_geradora_de_reservas(quantidade) {

    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    let reserva_list = []
    var ids_quartos = []

    for (let i = 0; i < quantidade; i++) {

        let reserva = []

        reserva.push(getRandomInt(0, 10))
        let j = `${i}`
        reserva.push(`${j[0]}${j[0]}/${j[0]}${j[0]}/${j[0]}${j[0]}${j[0]}${j[0]}`)

        let id_quarto = getRandomInt(0, 100)
        while (ids_quartos.includes(id_quarto)) {
            id_quarto = getRandomInt(0, 100)
        }

        reserva.push(id_quarto)
        ids_quartos.push(id_quarto)

        reserva_list.push(reserva)
    }

    return reserva_list

}

let sistema1 = new sistema
sistema1.menu()