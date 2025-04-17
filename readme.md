# Share Stay - Sistema de Compartilhamento de Bens

### **Requisitos Funcionais "RF's":**

1. **Gestão de Bens:**
    - [RF01] Deve ser possível cadastrar um bem (imóvel ou náutico)
    - [RF02] Deve ser possível definir o número total de cotas para cada bem
    - [RF03] Deve ser possível visualizar todos os bens cadastrados
    - [RF04] Deve ser possível atualizar informações do bem
    - [RF05] Deve ser possível remover um bem do sistema

2. **Gestão de Cotas:**
    - [RF06] Deve ser possível criar cotas para um bem específico
    - [RF07] Deve ser possível associar múltiplos usuários a uma cota
    - [RF08] Deve ser possível visualizar todas as cotas de um bem
    - [RF09] Deve ser possível transferir cotas entre usuários
    - [RF10] Deve ser possível consultar o histórico de propriedade de uma cota

3. **Gestão de Temporadas:**
    - [RF11] Deve ser possível definir períodos de temporada (alta, média, baixa)
    - [RF12] Deve ser possível visualizar a distribuição de temporadas do ano
    - [RF13] O sistema deve realizar automaticamente a rotação de temporadas ao final do ano
    - [RF14] Deve ser possível consultar o histórico de temporadas de uma cota

4. **Gestão de Uso:**
    - [RF15] Deve ser possível reservar períodos de uso do bem
    - [RF16] Deve ser possível confirmar ou declinar o uso de uma cota
    - [RF17] O sistema deve notificar usuários sobre prazos de confirmação de uso
    - [RF18] Deve ser possível visualizar o calendário de uso do bem
    - [RF19] Deve ser possível cancelar uma reserva dentro do prazo estabelecido

5. **Gestão de Locações:**
    - [RF20] Deve ser possível disponibilizar uma cota para locação
    - [RF21] Deve ser possível registrar uma locação para uma cota disponível
    - [RF22] O sistema deve calcular automaticamente os valores de locação
    - [RF23] Deve ser possível visualizar o histórico de locações
    - [RF24] Deve ser possível gerar relatórios financeiros de locações

6. **Gestão de Usuários:**
    - [RF25] Deve ser possível cadastrar novos usuários
    - [RF26] Deve ser possível autenticar usuários no sistema
    - [RF27] Deve ser possível recuperar senha
    - [RF28] Deve ser possível atualizar dados do perfil
    - [RF29] Deve ser possível visualizar histórico de atividades do usuário

### **Requisitos Não Funcionais "RNF's":**

1. **Segurança:**
    - [RNF01] O sistema deve utilizar JWT para autenticação
    - [RNF02] As senhas devem ser armazenadas de forma criptografada
    - [RNF03] O sistema deve ter proteção contra ataques comuns (SQL Injection, XSS)

2. **Performance:**
    - [RNF04] O sistema deve responder a requisições em menos de 1 segundo
    - [RNF05] O sistema deve suportar múltiplos usuários simultâneos
    - [RNF06] O sistema deve ter alta disponibilidade (99.9% uptime)

3. **Usabilidade:**
    - [RNF07] O sistema deve ser responsivo
    - [RNF08] O sistema deve ter interface intuitiva
    - [RNF09] O sistema deve ter documentação clara para usuários

### **Regras de Negócio "RN's":**

1. **Cotas:**
    - [RN01] Uma cota não pode ser vendida se estiver com uso agendado
    - [RN02] Uma cota pode ter múltiplos proprietários
    - [RN03] O total de cotas de um bem deve ser definido no cadastro

2. **Temporadas:**
    - [RN04] Um usuário não pode ter alta temporada em anos consecutivos
    - [RN05] A rotação de temporadas deve seguir a ordem: alta → média → baixa → alta
    - [RN06] As datas de cada temporada devem ser configuráveis por bem

3. **Uso e Locação:**
    - [RN07] O prazo mínimo para confirmação de uso é de 60 dias
    - [RN08] Cotas não confirmadas podem ser disponibilizadas para locação
    - [RN09] O proprietário deve receber 70% do valor da locação
    - [RN10] Cancelamentos com menos de 30 dias podem ter multa

4. **Usuários:**
    - [RN11] Um usuário pode ter cotas em múltiplos bens
    - [RN12] A transferência de cotas requer aprovação do administrador
    - [RN13] Usuários inadimplentes não podem fazer reservas