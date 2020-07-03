// Dashboard
import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './styles';
import api from '../../services/api';

// A DICA é que não precisa botar tudo que tem na API, só o que vai usar
interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

// substitui a function Dashboard() para ficar menos verbosa a setagem do type da função
const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem(
            '@GithubExplorer.repositories',
        );
        if (storagedRepositories) {
            return JSON.parse(storagedRepositories);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem(
            '@GithubExplorer.repositories',
            JSON.stringify(repositories),
        );
    }, [repositories]);

    // FormEvent que importou lá em cima define o tipo do evento, um evento de formulário
    // quando declara ele e te dá vários submetodos
    async function handleAddRepository(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        // Adição de um novo repositório
        // consome a API do github e salva o repositório no estado;
        event.preventDefault();

        if (!newRepo) {
            setInputError('Digite autor/nome do repositório');
            return;
        }
        try {
            // aqui ele tá forçando o tipo que entra com response
            const response = await api.get<Repository>(`repos/${newRepo}`);

            const repository = response.data;

            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputError('');
        } catch (err) {
            setInputError('Erro na busca por esse respositório');
        }
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore Repositórios no GitHub</Title>
            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {/* É tipo de um if - a segunda parte só vai ser executada se a primeira for satisfeita */}
            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map((repository) => (
                    <Link
                        key={repository.full_name}
                        to={`/repositories/${repository.full_name}`}
                    >
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;
