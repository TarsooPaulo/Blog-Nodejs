import os

print('*********************************\n'
      '      BEM-VINDO A STARTORY\n'
      'a luz das estrelas te acompanham?\n'
      '*********************************')
player = str(input('Insira seu nick: ')).strip().title()
while True:
    r = str(input('Tem certeza que deseja continuar? (sim/não): ')).strip().lower()
    if r == 'não':
        print('saindo...')
        break
    elif r == 'sim':
        r2 = input('Tem certeza mesmo? (sim/não): ').strip().lower()
        if r2 == 'não':
            break
        elif r2 == 'sim':
            if r2 == 'sim':
                os.system("clear") or None
                print('boa sorte...')
                print(f'vamos começar o jogo {player}')
                while True:
                    print('Voce esta em uma sala escura. O que deseja fazer?')
                    print('1. Acender uma vela')
                    print('2. Abrir a porta')
                    print('3. Sair do jogo')
                    escolha = input('Escolha uma opção (1/2/3): ').strip()
                    if escolha == '1':
                        os.system('clear') or None
                        print('Voce acende uma vela, observando ao seu redor, \n'
                              'as paredes e teto estão repletas de estrelas\n'
                              'com olhos no meio de cada uma que te observam\n'
                              'para onde voce vai, no chao, jogado perto da parede\n'
                              'voce enxerga uns papeis.\n'
                              'o que voce vai fazer?\n')
                        print('1. Pegar papeis')
                        print('2. Abrir a porta')
                        print('3. Sair do jogo')
                        escolha2 = input('Escolha uma opção (1/2/3): ')
                        while True:
                            if escolha2 == '1' or escolha2 == "2":
                                os.system('clear') or None
                                print('Voce pega 3 papeis, em cada papel existem 3 desenhos\n'
                                      'diferentes:\n'
                                      '|papel 1:|papel 2:|papel 3:|\n'
                                      '|   *    |    *   | *      |\n'
                                      '|   *    |   *    |  *     |\n'
                                      '| *      |   * *  |  *     |\n'
                                      '| * *    |     *  |  * *   |\n'
                                      '|    *   |  * *   |     *  |\n'
                                      '|    *   | *      |     *  |\n'
                                      '----------------------------\n')
                                break
                    elif escolha == '2':
                        for i in range(8):
                            os.system('clear') or None
                            print('Voce abre a porta e da de cara com uma floresta densa\n'
                              'com uma escuridao que consome tudo ao redor, a lua esta sorrindo\n'
                              'para voce, as estrelas te observam, voce da alguns passos \n'
                              'e o quarto atras de voce some é preenchido com a densa floresta.\n'
                              'Voce esta no meio de um labirinto.\n'
                              'Para onde voce vai?')
                            print('1. Norte')
                            print('2. Leste')
                            print('3. Oeste')
                            print('4. Sul')
                            print('5. Sair da floresta')
                            escolha3 = input('Escolha uma opção (1/2/3/4/5): ')
                            match escolha3:
                                case '1':
                                    print('você escolheu andar para o norte')
                                case '2':
                                    print('você escolheu andar para o leste')
                                case '3':
                                    print('você escolheu andar para o oeste')
                                case '4':
                                    print('você escolheu andar para o sul')
                                case '5':
                                    print('você escolheu sair da floresta')
                                    break
                                case _:
                                    print('opção inválida')
                                    continue
                            os.system('clear') or None
                            print('você chegou no final do caminho')
                    elif escolha == '3':
                        print('você saiu')
                        break
                    else:
                        os.system('clear') or None
                        print('opção inválida')
                        continue
            break

        else:
            print('digite corretamente')
    else:
        print('Digite corretamente')