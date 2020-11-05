package io.github.MateusASilva.clientes.model.repository;

import io.github.MateusASilva.clientes.model.entity.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoRepository extends JpaRepository<Servico,Integer> {
}
