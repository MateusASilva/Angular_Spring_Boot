package io.github.MateusASilva.clientes.model.repository;

import io.github.MateusASilva.clientes.model.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente,Integer> {

}
