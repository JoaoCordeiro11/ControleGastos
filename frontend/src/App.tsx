import { useEffect, useState } from "react";
import api from "./services/api";
import TransacaoForm from "./components/TransacaoForm";
import TransacaoLista from "./components/TransacaoLista";
import Totais from "./components/Totais";
import PessoaForm from "./components/PessoaForm";
import PessoaLista from "./components/PessoaLista";

interface Pessoa {
    id: number;
    nome: string;
    idade: number;
}

interface Transacao {
    id: number;
    descricao: string;
    valor: number;
    tipo: string;
    pessoaId: number;
}

interface TotalPessoa {
    nome: string;
    receitas: number;
    despesas: number;
    saldo: number;
}

interface TotaisGerais {
    pessoas: TotalPessoa[];
    totalReceitas: number;
    totalDespesas: number;
    saldoGeral: number;
}

function App() {

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    const [totais, setTotais] = useState<TotaisGerais>();

    async function carregarPessoas() {

        const resposta = await api.get("/Pessoas");

        setPessoas(resposta.data);
    }

    async function excluirPessoa(id: number) {

        await api.delete(`/Pessoas/${id}`);

        carregarPessoas();

        carregarTransacoes();

        carregarTotais();

    }

    async function carregarTransacoes() {

        const resposta = await api.get("/Transacoes");

        setTransacoes(resposta.data);

    }

    async function carregarTotais() {

        const resposta = await api.get("/Totais");

        setTotais(resposta.data);

    }

    useEffect(() => {

        carregarPessoas();

        carregarTransacoes();

        carregarTotais();

    }, []);

    return (
        <>

            <header className="cabecalho">
                <h1>Controle de Gastos</h1>
                <p>Gerencie pessoas, receitas e despesas em um só lugar</p>
            </header>

            <div className="formularios">
                <div className="card">
                    <PessoaForm
                        aoCadastrar={() => {
                            carregarPessoas();
                            carregarTotais();
                        }}
                    />
                </div>

                <div className="card">
                    <TransacaoForm
                        pessoas={pessoas}
                        aoCadastrar={() => {
                            carregarPessoas();
                            carregarTransacoes();
                            carregarTotais();
                        }}
                    />
                </div>
            </div>

            <div className="secao">
                <PessoaLista
                    pessoas={pessoas}
                    aoExcluir={excluirPessoa}
                />
            </div>

            <div className="secao">
                <TransacaoLista
                    transacoes={transacoes}
                />
            </div>

            <div className="secao">
                <Totais
                    dados={totais}
                />
            </div>
        </>
    );
}

export default App;