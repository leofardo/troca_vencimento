class Vencimento{
  constructor(){
    moment.locale('pt-br')

    const ctrlF5 = setTimeout(()=>{
      window.location.reload(true)
    }        
    , 25200000);  //7 horas

  }

  alterarModo(bool){

    if(bool){

      let classes_btn_menor_maior = document.getElementById('btn-menor-maior').classList

      let trocar = true

      for (let i = 0; i < classes_btn_menor_maior.length; i++) {
        let classe = classes_btn_menor_maior[i];

        if(classe == "active"){
          trocar = false
          break
        }else{
          trocar = true
        }
      }

      if(trocar){

        classes_btn_menor_maior.add("active")

        let classes_btn_maior_menor = document.getElementById('btn-maior-menor').classList

        classes_btn_maior_menor.remove("active")

        document.getElementById('botao-gerar').setAttribute('onclick', "vencimento.menorMaior()")


      }

    }else{


      let classes_btn_maior_menor = document.getElementById('btn-maior-menor').classList

      let trocar = true

      for (let i = 0; i < classes_btn_maior_menor.length; i++) {
        let classe = classes_btn_maior_menor[i];

        if(classe == "active"){
          trocar = false
          break
        }else{
          trocar = true
        }
      }

      if(trocar){

        classes_btn_maior_menor.add("active")

        let classes_btn_menor_maior = document.getElementById('btn-menor-maior').classList

        classes_btn_menor_maior.remove("active")

        document.getElementById('botao-gerar').setAttribute('onclick', "vencimento.maiorMenor()")


      }

    }
  }


  menorMaior(){
    let dia_antigo = document.getElementsByName('dia_antigo')[0].value
    let dia_novo = document.getElementsByName('dia_novo')[0].value
    let data_contato = document.getElementsByName('data_contato')[0].value
    let valor_desconto = document.getElementsByName('valor_desconto')[0].value

    if(parseInt(dia_antigo) >= parseInt(dia_novo)){
      alert('Por favor, implemente o dia vencimento novo com um valor MAIOR que o dia vencimento antigo')
    }else if(dia_antigo == '' || dia_novo == '' || data_contato == '' || valor_desconto == ''|| parseInt(dia_antigo) <=0 || parseInt(dia_novo) <=0 || parseFloat(valor_desconto) < 0){
      alert('Por favor, preencha todos os campos obrigatórios.')
    }else if(parseInt(dia_antigo) >= 29 || parseInt(dia_novo) >= 29){
      alert('Por favor, preencha os dias com os valores de 28 para baixo')
    }else{
      if(dia_antigo < 10){
        dia_antigo = parseInt('0'+dia_antigo)
      }
  
      if(dia_novo < 10){
        dia_novo = parseInt('0'+dia_novo)
      }
  
  
      //data_contato
      let ano_mes_contato = data_contato.slice(0,7)
      let ano_contato = data_contato.slice(0,4)
      let mes_contato = data_contato.slice(5,7)
      let dia_contato = data_contato.slice(8,10)
    
      let prazo_faturamento = 14
  
      if(parseInt(dia_contato) < dia_antigo){ //antes de pagar o boleto do mesmo mes
  
        let diferenca_dias = Math.abs(dia_antigo - dia_contato)
  
        let data_inicio_contrato_antigo = `${dia_antigo}/${mes_contato}/${ano_contato}`
  
        let dias_do_mes = moment(data_inicio_contrato_antigo, "YYYY-MM").daysInMonth()
  
        // if(dias_do_mes == 31){ // alteração danilo 
        //   var dias_pre_pago = 30
        // }else if (dias_do_mes == 30){
        //   var dias_pre_pago = 29
        // }else if (dias_do_mes == 28){
        //   var dias_pre_pago = 27
        // }else if(dias_do_mes == 29){
        //   var dias_pre_pago = 28
        // }

        var dias_pre_pago = dias_do_mes

        
        let diferenca_contato_vencimento_antigo = moment(data_contato, "YYYY-MM-DD").diff(moment(data_inicio_contrato_antigo,"DD/MM/YYYY"))
  
        let diferenca_contato_vencimento_antigo_dias = Math.abs(moment.duration(diferenca_contato_vencimento_antigo).asDays())
  
        let data_fim_contrato_antigo = moment(data_inicio_contrato_antigo, "DD/MM/YYYY").add((dias_pre_pago), 'days').format('L')
  
  
        if(diferenca_dias <= prazo_faturamento){ // mesmo mês 17 27 09/11/22
          
          console.log('boleto já faturado, vai cair só mês que vem')
  
          this.alteracaoVencimentoFaturadoMenorMaior(data_fim_contrato_antigo, dia_novo, valor_desconto, data_inicio_contrato_antigo, diferenca_contato_vencimento_antigo_dias, dia_antigo)
  
        }else{//17 27 01/11/2022
          console.log('boleto ainda não faturado, vai cair nesse mes ainda na data nova')
  
          this.alteracaoVencimentoNaoFaturadoMenorMaior(data_inicio_contrato_antigo, dia_novo, valor_desconto, diferenca_contato_vencimento_antigo_dias, dia_antigo)
  
        }
  
        console.log(`Começo de contrato antigo antigo: ${data_inicio_contrato_antigo}, Fim de contrato: ${data_fim_contrato_antigo}`)
        
      }else{ // depois de pagar o boleto no mesmo mês e quer trocar o proximo mes
  
        let prox_mes = parseInt(mes_contato) + 1
        
        if(prox_mes == 13){
          prox_mes = 1
          ano_contato = parseInt(ano_contato) + 1
        }
  
        console.log(data_contato)
        let data_proxima_fatura = `${dia_antigo}/${prox_mes}/${ano_contato}`
        console.log(data_proxima_fatura)
  
        let diferenca_contato_prox_vencimento = moment.duration(moment(data_proxima_fatura,"DD/MM/YYYY").diff(moment(data_contato, "YYYY-MM-DD"))).asDays()
  
        console.log(diferenca_contato_prox_vencimento)
  
        let dias_do_mes = moment(data_proxima_fatura, "YYYY-MM").daysInMonth()
  
        // if(dias_do_mes == 31){ // alteração danilo 
        //   var dias_pre_pago = 30
        // }else if (dias_do_mes == 30){
        //   var dias_pre_pago = 29
        // }else if (dias_do_mes == 28){
        //   var dias_pre_pago = 27
        // }else if(dias_do_mes == 29){
        //   var dias_pre_pago = 28
        // }

        var dias_pre_pago = dias_do_mes
  
        let data_fim_contrato_prox_fatura = moment(data_proxima_fatura, "DD/MM/YYYY").add(dias_pre_pago, 'days')
  
        if(diferenca_contato_prox_vencimento <= prazo_faturamento){
          
          console.log('proximo boleto já faturado, vai cair só daqui a dois meses')
  
          this.alteracaoVencimentoFaturadoMenorMaior(data_fim_contrato_prox_fatura, dia_novo, valor_desconto, data_proxima_fatura, diferenca_contato_prox_vencimento, dia_antigo)
  
        }else{
          console.log('proximo boleto ainda não faturado, vai cair no proximo mes')
  
          this.alteracaoVencimentoNaoFaturadoMenorMaior(data_proxima_fatura, dia_novo, valor_desconto, diferenca_contato_prox_vencimento, dia_antigo)
  
        }
  
  
      }
    } 
  }


  alteracaoVencimentoFaturadoMenorMaior(data_fim_contrato_antigo, dia_novo, valor, data_inicio_contrato_antigo, diferenca_dias, dia_antigo){ // 17 27 09/11    //e também cai o 03 27 31/10

    let comeco_data_contagem = moment(data_fim_contrato_antigo, "DD/MM/YYYY").add(0, 'days')// alteração danilo (add 1)
    let comeco_data_contagem_string = moment(data_fim_contrato_antigo, "DD/MM/YYYY").add(0, 'days').format('L') // aq tbm
    let comeco_data_contagem_string_mes = comeco_data_contagem_string.slice(3,5)
    let comeco_data_contagem_string_ano = comeco_data_contagem_string.slice(6,10)

    let fim_data_contagem =  moment(`${dia_novo}/${comeco_data_contagem_string_mes}/${comeco_data_contagem_string_ano}`, "DD/MM/YYYY")
    let fim_data_contagem_string =  moment(`${dia_novo}/${comeco_data_contagem_string_mes}/${comeco_data_contagem_string_ano}`, "DD/MM/YYYY").format('L')

    let data_nova_vencimento = fim_data_contagem_string

    console.log(comeco_data_contagem_string)
    console.log(fim_data_contagem_string)


    console.log(diferenca_dias)

  

    let diferenca_datas = moment(data_nova_vencimento, "DD/MM/YYYY").diff(moment(comeco_data_contagem,"DD/MM/YYYY"))
    let diferenca_datas_dias = moment.duration(diferenca_datas).asDays();

    let data_fim_contagem_proporcional = moment(data_nova_vencimento, "DD/MM/YYYY").add((-1), 'days').format('L') 


    let proporcional = (parseFloat(valor) / 30) * parseInt(diferenca_datas_dias)

    console.log(parseFloat(valor))
    console.log(proporcional)

    let valor_com_proporcional = (parseFloat(valor) + proporcional).toFixed(2)

    console.log(diferenca_dias)

    if(diferenca_dias <= 14){ //14 dias ou menos
      

      var mensagem = `DADOS E CONTATOS CONFIRMADOS\n`+
      `PROTOCOLO INFORMADO\n`+
      `TROCA DE VENCIMENTO DO DIA ${dia_antigo} PARA O DIA ${dia_novo}\n\n`+
 
      `CLIENTE SOLICITOU A TROCA 14 DIAS OU MENOS ANTES DO VENCIMENTO, APÓS O FATURAMENTO OCORRER\n\n`+
      `O BOLETO DO DIA ${data_inicio_contrato_antigo} NO VALOR DE R$ 97.70 PRECISA SER PAGO NORMALMENTE\n\n`+
      
      `O PRÓXIMO BOLETO A VENCER SERÁ DIA ${data_nova_vencimento} NO VALOR DE R$ ${valor_com_proporcional}, ONDE:\n\n`+
      `VALOR DA MENSALIDADE: R$ ${valor}\n`+
      `${diferenca_datas_dias} DIAS DE PROPORCIONAL DO DIA ${comeco_data_contagem_string} A ${data_fim_contagem_proporcional}: R$ ${proporcional.toFixed(2)}\n\n`+
      
      `APÓS ESSA FATURA, O CLIENTE RETORNA O PAGAMENTO NORMAL DE R$ ${valor} ATÉ O VENCIMENTO ESCOLHIDO.\n\n`+
 
 
 
      `CIENTE DO PRAZO DE 72H ÚTEIS PARA ALTERAÇÃO DO VENCIMENTO DO CONTRATO;\n` + 
      `CIENTE QUE SE POR ALGUM MOTIVO, A TROCA DE VENCIMENTO NÃO PUDER SER REALIZADA IREMOS RETORNAR O CONTATO; CASO CONTRÁRIO, APÓS CONCLUSÃO O ATENDIMENTO SERÁ FINALIZADO;\n\n` + 
 
      `CIENTE QUE OS TERMOS DO CONTRATO PARA LEITURA E CONFERÊNCIA FICARÃO DISPONÍVEIS NO SAC/ APLICATIVO (www.emexinternet.com.br/SAC  Área do cliente);\n` + 
      `CLIENTE COMPREENDEU E CONCORDOU COM OS TERMOS E FICOU CIENTE QUE TROCA DE VENCIMENTO É ACEITO EM LIGAÇÃO GRAVADA.`


    }else{ // 15 dias ou mais
    
      var mensagem = 'teste'

    }

    document.getElementById('mensagem').value = mensagem


  }

  alteracaoVencimentoNaoFaturadoMenorMaior(data_inicio_contrato_antigo, dia_novo, valor, diferenca_dias, dia_antigo){ //17 27 01/11/2022 // e tambem 17 27 31/10
    let data_inicio_contagem = data_inicio_contrato_antigo

    console.log(data_inicio_contagem)

    let data_inicio_contagem_array = data_inicio_contagem.split('/');

    let data_inicio_contagem_mes = data_inicio_contagem_array[1]
    let data_inicio_contagem_ano = data_inicio_contagem_array[2]



    let data_nova_vencimento =  moment(`${dia_novo}/${data_inicio_contagem_mes}/${data_inicio_contagem_ano}`, "DD/MM/YYYY").format('L')

    let data_fim_contagem_proporcional = moment(data_nova_vencimento, "DD/MM/YYYY").add((-1), 'days').format('L') 


    let data_inicio_contagem_moment =  moment(data_inicio_contagem, "DD/MM/YYYY")
    let data_nova_vencimento_moment =  moment(data_nova_vencimento, "DD/MM/YYYY")


    let diferenca_datas = moment(data_nova_vencimento_moment, "DD/MM/YYYY").diff(moment(data_inicio_contagem_moment,"DD/MM/YYYY"))
    let diferenca_datas_dias = moment.duration(diferenca_datas).asDays();


    
    let proporcional = (parseFloat(valor) / 30) * parseInt(diferenca_datas_dias)
    let valor_com_proporcional = (parseFloat(valor) + proporcional).toFixed(2)

    console.log(diferenca_dias)

    if(diferenca_dias <= 14){ // 14 dias ou menos

    
     var mensagem = 'caiu'


    }else{ // 15 dias ou mais
      
      var mensagem = `DADOS E CONTATOS CONFIRMADOS\n`+
      `PROTOCOLO INFORMADO\n`+
      `TROCA DE VENCIMENTO DO DIA ${dia_antigo} PARA O DIA ${dia_novo}\n\n`+
      
      `CLIENTE SOLICITOU A TROCA PELO MENOS 15 DIAS ANTES DO VENCIMENTO, ONDE O FATURAMENTO AINDA NÃO OCORREU.\n\n`+
      
      `O PRÓXIMO BOLETO A VENCER SERÁ DIA ${data_nova_vencimento} NO VALOR DE R$ ${valor_com_proporcional}, ONDE:\n\n`+
      `VALOR DA MENSALIDADE: R$ ${valor}\n`+
      `${diferenca_datas_dias} DIAS DE PROPORCIONAL DO DIA ${data_inicio_contagem} ATE ${data_fim_contagem_proporcional} : R$ ${proporcional.toFixed(2)}\n\n`+
      
      `APÓS ESSA FATURA, O CLIENTE RETORNA O PAGAMENTO NORMAL DE R$ ${valor} ATÉ O VENCIMENTO ESCOLHIDO.\n\n`+

      `CIENTE DO PRAZO DE 72H ÚTEIS PARA ALTERAÇÃO DO VENCIMENTO DO CONTRATO;\n` + 
      `CIENTE QUE SE POR ALGUM MOTIVO, A TROCA DE VENCIMENTO NÃO PUDER SER REALIZADA IREMOS RETORNAR O CONTATO; CASO CONTRÁRIO, APÓS CONCLUSÃO O ATENDIMENTO SERÁ FINALIZADO;\n\n` + 

      `CIENTE QUE OS TERMOS DO CONTRATO PARA LEITURA E CONFERÊNCIA FICARÃO DISPONÍVEIS NO SAC/ APLICATIVO (www.emexinternet.com.br/SAC  Área do cliente);\n` + 
      `CLIENTE COMPREENDEU E CONCORDOU COM OS TERMOS E FICOU CIENTE QUE TROCA DE VENCIMENTO É ACEITO EM LIGAÇÃO GRAVADA.`

    }


  

    document.getElementById('mensagem').value = mensagem


  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------

  maiorMenor(){ // 22 7 09/11/2022


    let dia_antigo = document.getElementsByName('dia_antigo')[0].value
    let dia_novo = document.getElementsByName('dia_novo')[0].value
    let data_contato = document.getElementsByName('data_contato')[0].value
    let valor_desconto = document.getElementsByName('valor_desconto')[0].value


    if(parseInt(dia_antigo) <= parseInt(dia_novo)){
      alert('Por favor, implemente o dia vencimento novo com um valor MENOR que o dia vencimento antigo')
    }else if(dia_antigo == '' || dia_novo == '' || data_contato == '' || valor_desconto == ''){
      alert('Por favor, preencha todos os campos obrigatórios.')
    }else if(parseInt(dia_antigo) >= 29 || parseInt(dia_novo) >= 29){
      alert('Por favor, preencha os dias com os valores de 28 para baixo')    
    }else{
      if(dia_antigo < 10){
        dia_antigo = parseInt('0'+dia_antigo)
      }
  
      if(dia_novo < 10){
        dia_novo = parseInt('0'+dia_novo)
      }
  
  
      //data_contato
      let ano_mes_contato = data_contato.slice(0,7)
      let ano_contato = data_contato.slice(0,4)
      let mes_contato = data_contato.slice(5,7)
      let dia_contato = data_contato.slice(8,10)
    
      let prazo_faturamento = 14
  
  
  
      if(parseInt(dia_contato) < dia_antigo){ //antes faturado  //antes de pagar o boleto
  
  
        let diferenca_dias = Math.abs(dia_antigo - dia_contato)
  
        let data_inicio_contrato_antigo = `${dia_antigo}/${mes_contato}/${ano_contato}`
  
        let dias_do_mes = moment(data_inicio_contrato_antigo, "YYYY-MM").daysInMonth()
  
        console.log(diferenca_dias)
        console.log(data_inicio_contrato_antigo)
        console.log(dias_do_mes)
  
        // if(dias_do_mes == 31){ // alteração danilo 
        //   var dias_pre_pago = 30
        // }else if (dias_do_mes == 30){
        //   var dias_pre_pago = 29
        // }else if (dias_do_mes == 28){
        //   var dias_pre_pago = 27
        // }else if(dias_do_mes == 29){
        //   var dias_pre_pago = 28
        // }

        var dias_pre_pago = dias_do_mes
  
        // let diferenca_contato_vencimento_antigo = moment(data_contato, "YYYY-MM-DD").diff(moment(data_inicio_contrato_antigo,"DD/MM/YYYY"))
  
        // let diferenca_contato_vencimento_antigo_dias = Math.abs(moment.duration(diferenca_contato_vencimento_antigo).asDays())
  
        let data_fim_contrato_antigo = moment(data_inicio_contrato_antigo, "DD/MM/YYYY").add((dias_pre_pago), 'days').format('L')
  
  
        if(diferenca_dias <= prazo_faturamento){ // 22 2 09/11/2022 boleto no mesmo mes ja faturado
  
  
          let data_proporcional = moment(data_fim_contrato_antigo, "DD/MM/YYYY").add(0, 'days').format('L') // danilo
  
          console.log(data_proporcional)
  
  
          let prox_mes = parseInt(mes_contato) + 2 
        
          if(prox_mes == 13){
            prox_mes = 1
            ano_contato = parseInt(ano_contato) + 1
          }else if(prox_mes == 14){
            prox_mes = 2
            ano_contato = parseInt(ano_contato) + 1
          }
  
          console.log(data_contato)
          let data_nova_proxima_fatura = `${dia_novo}/${prox_mes}/${ano_contato}`
  
          console.log(data_nova_proxima_fatura)
          
          console.log('boleto já faturado, proporcional vai cair só mês que vem e no ooutro mes sera a mensalidade na nova data')
  
          //VALOR DE DIAS A SEREM CALCULADOS PROPORCIONAL
          let diferenca_data_nova_data_antiga = moment.duration(moment(data_nova_proxima_fatura,"DD/MM/YYYY").diff(moment(data_proporcional, "DD/MM/YYYY"))).asDays()
  
          console.log('Diferenca de dias: ' + diferenca_data_nova_data_antiga)
  
          this.altVencimentoFaturadoMaiorMenor(data_proporcional, data_nova_proxima_fatura, diferenca_data_nova_data_antiga, valor_desconto, true, dia_antigo, dia_novo, data_inicio_contrato_antigo)
  
        }else{ //22 2 01/11/2022 no mesmo mes ainda nao faturado
  
          let data_proporcional = data_inicio_contrato_antigo
  
          console.log(data_proporcional)
  
  
          let prox_mes = parseInt(mes_contato) + 1
        
          if(prox_mes == 13){
            prox_mes = 1
            ano_contato = parseInt(ano_contato) + 1
          }
  
          console.log(data_contato)
          let data_nova_proxima_fatura = `${dia_novo}/${prox_mes}/${ano_contato}`
  
          console.log(data_nova_proxima_fatura)
  
          console.log('boleto ainda não faturado, proporcional vai nesse mes ainda e no prox mes a mensalidade na nova data')
  
           //VALOR DE DIAS A SEREM CALCULADOS PROPORCIONAL
           let diferenca_data_nova_data_antiga = moment.duration(moment(data_nova_proxima_fatura,"DD/MM/YYYY").diff(moment(data_proporcional, "DD/MM/YYYY"))).asDays()
  
           console.log('Diferenca de dias: ' + diferenca_data_nova_data_antiga)
   
           this.altVencimentoFaturadoMaiorMenor(data_proporcional, data_nova_proxima_fatura, diferenca_data_nova_data_antiga, valor_desconto, false, dia_antigo, dia_novo, data_inicio_contrato_antigo)
  
  
        }
  
        console.log(`Começo de contrato antigo antigo: ${data_inicio_contrato_antigo}, Fim de contrato: ${data_fim_contrato_antigo}`)
      }else{ // depois faturado  //depois de pagar o boleto
  
        console.log('bolet foi pago kkk')
  
        let prox_mes = parseInt(mes_contato) + 1
        
        if(prox_mes == 13){
          prox_mes = 1
          ano_contato = parseInt(ano_contato) + 1
        }
  
        console.log(data_contato)
        let data_proxima_fatura = `${dia_antigo}/${prox_mes}/${ano_contato}`
        console.log(data_proxima_fatura)
  
        let diferenca_contato_prox_vencimento = moment.duration(moment(data_proxima_fatura,"DD/MM/YYYY").diff(moment(data_contato, "YYYY-MM-DD"))).asDays()
  
        console.log(diferenca_contato_prox_vencimento)
  
        let dias_do_mes = moment(data_proxima_fatura, "YYYY-MM").daysInMonth()
  
        // if(dias_do_mes == 31){ // alteração danilo 
        //   var dias_pre_pago = 30
        // }else if (dias_do_mes == 30){
        //   var dias_pre_pago = 29
        // }else if (dias_do_mes == 28){
        //   var dias_pre_pago = 27
        // }else if(dias_do_mes == 29){
        //   var dias_pre_pago = 28
        // }

        var dias_pre_pago = dias_do_mes
  
        let data_fim_contrato_prox_fatura = moment(data_proxima_fatura, "DD/MM/YYYY").add(dias_pre_pago, 'days')
  
        if(diferenca_contato_prox_vencimento <= prazo_faturamento){ //7 2 31/10
  
          let prox_mes = parseInt(mes_contato) + 2
        
          if(prox_mes == 13){
            prox_mes = 1
            // ano_contato = parseInt(ano_contato) + 1
          }else if(prox_mes == 14){
            prox_mes = 2
            // ano_contato = parseInt(ano_contato) + 1
          }
          
          let data_proporcional = `${dia_antigo}/${prox_mes}/${ano_contato}`
  
          console.log(data_proporcional)
  
          let prox_mes_data_nova = parseInt(mes_contato) + 3
        
          if(prox_mes_data_nova == 13){
            prox_mes_data_nova = 1
            ano_contato = parseInt(ano_contato) + 1
          }else if(prox_mes_data_nova == 14){
            prox_mes_data_nova = 2
          }else if(prox_mes_data_nova == 15){
            prox_mes_data_nova = 3
          }
  
  
          let data_nova_proxima_fatura = `${dia_novo}/${prox_mes_data_nova}/${ano_contato}`
  
  
          console.log('Proporcional caira na data de: ' + data_proporcional + ' e a mensalidade na data nova será em: ' + data_nova_proxima_fatura)
          console.log('proximo boleto já faturado, proporcional so vai cair só daqui a dois meses e a nova data somente no mes seguinte') // nova data so dps de 3 meses
  
  
          //VALOR DE DIAS A SEREM CALCULADOS PROPORCIONAL
          let diferenca_data_nova_data_antiga = moment.duration(moment(data_nova_proxima_fatura,"DD/MM/YYYY").diff(moment(data_proporcional, "DD/MM/YYYY"))).asDays()
  
          console.log('Diferenca de dias: ' + diferenca_data_nova_data_antiga)
  
          this.altVencimentoFaturadoMaiorMenor(data_proporcional, data_nova_proxima_fatura, diferenca_data_nova_data_antiga, valor_desconto, true, dia_antigo, dia_novo)
  
  
  
        }else{ //22 7 31/10
  
          let data_proporcional = data_proxima_fatura
  
          console.log('Data proporcional: ' + data_proporcional)
  
  
  
          let prox_mes_data_nova = parseInt(mes_contato) + 2
        
          if(prox_mes_data_nova == 13){
            prox_mes_data_nova = 1
            ano_contato = parseInt(ano_contato) + 1
          }else if(prox_mes_data_nova == 14){
            prox_mes_data_nova = 2
          }else if(prox_mes_data_nova == 15){
            prox_mes_data_nova = 3
          }
  
          let data_nova_proxima_fatura = `${dia_novo}/${prox_mes_data_nova}/${ano_contato}`
  
          console.log(data_nova_proxima_fatura)
  
          console.log('proximo boleto ainda não faturado, proporcional vai cair no proximo mes e no outro mes sera na nova data')
  
  
          //VALOR DE DIAS A SEREM CALCULADOS PROPORCIONAL
          let diferenca_data_nova_data_antiga = moment.duration(moment(data_nova_proxima_fatura,"DD/MM/YYYY").diff(moment(data_proporcional, "DD/MM/YYYY"))).asDays()
  
          console.log('Diferenca de dias: ' + diferenca_data_nova_data_antiga)
  
          this.altVencimentoFaturadoMaiorMenor(data_proporcional, data_nova_proxima_fatura, diferenca_data_nova_data_antiga, valor_desconto, false, dia_antigo, dia_novo)
  
  
        }
  
      }
    }
  }

  altVencimentoFaturadoMaiorMenor(data_proporci, data_nova_prox_fatura, diferenca_contato_vencimento_antigo, valor, bool, dia_antigo, dia_novo, data_inicio_contrato_antigo){

    let data_nova_proxima_fatura = moment(data_nova_prox_fatura, "DD/MM/YYYY").add((-1), 'days').format('L') 
    let data_proporcional = moment(data_proporci, "DD/MM/YYYY").format('L')

    let valor_proporcional = ((parseFloat(valor)/30) * parseInt(diferenca_contato_vencimento_antigo)).toFixed(2)




    if(!bool){ // não faturado

      var mensagem = 
      `DADOS E CONTATOS CONFIRMADOS\n` + 
      `PROTOCOLO INFORMADO\n` + 
      `TROCA DE VENCIMENTO DO DIA ${dia_antigo} PARA O DIA ${dia_novo}\n\n` + 
            
      `CLIENTE SOLICITANDO A TROCA 15 DIAS ANTES DO VENCIMENTO, ONDE O FATURAMENTO AINDA NÃO OCORREU.\n\n` + 
      
      `O PRÓXIMO BOLETO A VENCER SERÁ DIA ${data_proporcional} NO VALOR DE: R$ ${valor_proporcional}, ONDE: \n` + 
      `FOI CALCULADO ${diferenca_contato_vencimento_antigo} DIAS DE PROPORCIONAL DO DIA ${data_proporcional} ATE ${data_nova_proxima_fatura}\n\n` +
          
      `APÓS ESSA FATURA O CLIENTE RETORNA AO PAGAMENTO NORMAL DE R$ ${valor} ATÉ O VENCIMENTO ESCOLHIDO.\n\n` + 
            
      `CIENTE DO PRAZO DE 72H ÚTEIS PARA ALTERAÇÃO DO VENCIMENTO DO CONTRATO;\n` +
      `CIENTE QUE SE POR ALGUM MOTIVO, A TROCA DE VENCIMENTO NÃO PUDER SER REALIZADA IREMOS RETORNAR O CONTATO; CASO CONTRÁRIO, APÓS CONCLUSÃO O ATENDIMENTO SERÁ FINALIZADO;\n\n` +
            
      `CIENTE QUE OS TERMOS DO CONTRATO PARA LEITURA E CONFERÊNCIA FICARÃO DISPONÍVEIS NO SAC/ APLICATIVO (www.emexinternet.com.br/SAC  Área do cliente);\n` +
      `CLIENTE COMPREENDEU E CONCORDOU COM OS TERMOS E FICOU CIENTE QUE TROCA DE VENCIMENTO É ACEITO EM LIGAÇÃO GRAVADA.`
      

    }else{ // faturado

      var mensagem = 
      `DADOS E CONTATOS CONFIRMADOS\n` + 
      `PROTOCOLO INFORMADO\n` + 
      `TROCA DE VENCIMENTO DO DIA ${dia_antigo} PARA O DIA ${dia_novo}\n\n` + 
            
      `CLIENTE SOLICITOU A TROCA 14 DIAS OU MENOS ANTES DO VENCIMENTO, APÓS O FATURAMENTO OCORRER\n\n` + 
      `O BOLETO DO DIA ${data_inicio_contrato_antigo} NO VALOR DE R$ ${valor} PRECISA SER PAGO NORMALMENTE\n\n` + 
      
      `O BOLETO SEGUINTE A VENCER SERÁ DIA ${data_proporcional} NO VALOR DE R$ ${valor_proporcional}, ONDE:\n` + 
      `FOI CALCULADO ${diferenca_contato_vencimento_antigo} DIAS DE PROPORCIONAL DO DIA ${data_proporcional} ATE ${data_nova_proxima_fatura}\n\n` +  
          
      `APÓS ESSA FATURA O CLIENTE RETORNA A PAGAR NORMALMENTE O VALOR DE R$ ${valor} ATÉ O VENCIMENTO ESCOLHIDO.\n\n` + 
            
      `CIENTE DO PRAZO DE 72H ÚTEIS PARA ALTERAÇÃO DO VENCIMENTO DO CONTRATO;\n` +
      `CIENTE QUE SE POR ALGUM MOTIVO, A TROCA DE VENCIMENTO NÃO PUDER SER REALIZADA IREMOS RETORNAR O CONTATO; CASO CONTRÁRIO, APÓS CONCLUSÃO O ATENDIMENTO SERÁ FINALIZADO;\n\n` +
            
      `CIENTE QUE OS TERMOS DO CONTRATO PARA LEITURA E CONFERÊNCIA FICARÃO DISPONÍVEIS NO SAC/ APLICATIVO (www.emexinternet.com.br/SAC  Área do cliente);\n` +
      `CLIENTE COMPREENDEU E CONCORDOU COM OS TERMOS E FICOU CIENTE QUE TROCA DE VENCIMENTO É ACEITO EM LIGAÇÃO GRAVADA.`
    

    }

    let teste_mensagem= 'Na data de ' + data_proporcional + ' caira o proporcional de: R$' + valor_proporcional + '\n' + 
    'A mensalidade integral na nova data sera em ' + data_nova_proxima_fatura + ' no valor de: R$'+valor


    console.log(teste_mensagem)
    
    document.getElementById('mensagem').value = mensagem



  }


}

var vencimento =  new Vencimento();


function copiarTexto() {
  var copyText = document.getElementById("mensagem");
  navigator.clipboard.writeText(copyText.value);

  botaoCopiar = document.getElementById("copiar");

  botaoCopiar.innerHTML = "Copiado!"
  botaoCopiar.classList.remove('btn-secondary')
  botaoCopiar.classList.add('btn-success')

  const myTimeout = setTimeout(()=>{
          botaoCopiar.innerHTML = "Copiar"
          botaoCopiar.classList.remove('btn-success')
          botaoCopiar.classList.add('btn-secondary')
      }        
  , 1000);  
  
}


