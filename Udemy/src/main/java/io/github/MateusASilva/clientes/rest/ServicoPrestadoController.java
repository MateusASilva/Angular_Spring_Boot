package io.github.MateusASilva.clientes.rest;

import io.github.MateusASilva.clientes.model.entity.Cliente;
import io.github.MateusASilva.clientes.model.entity.ServicoPrestado;
import io.github.MateusASilva.clientes.model.repository.ClienteRepository;
import io.github.MateusASilva.clientes.model.repository.ServicoPrestadoRepository;
import io.github.MateusASilva.clientes.rest.dto.ServicoPrestadoDTO;
import io.github.MateusASilva.clientes.util.BigDecimalConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/servicos-prestados")

public class ServicoPrestadoController {
    private final ClienteRepository clienteRepository;
    private final ServicoPrestadoRepository servicorepository;
    private final BigDecimalConverter bigDecimalConverter;

    public ServicoPrestadoController(ClienteRepository clienteRepository, ServicoPrestadoRepository servicorepository, BigDecimalConverter bigDecimalConverter) {
        this.clienteRepository = clienteRepository;
        this.servicorepository = servicorepository;
        this.bigDecimalConverter = bigDecimalConverter;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoPrestado salvar(@RequestBody ServicoPrestadoDTO dto){
        LocalDate data = LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Integer idCliente = dto.getIdCliente();

        Cliente cliente = clienteRepository
                .findById(idCliente)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.BAD_REQUEST,"Cliente inexistente"));


        ServicoPrestado servicoPrestado = new ServicoPrestado();
        servicoPrestado.setDescricao(dto.getDescricao());
        servicoPrestado.setData(data);
        servicoPrestado.setCliente(cliente);
        servicoPrestado.setValor(bigDecimalConverter.converter(dto.getPreco()));

        return servicorepository.save(servicoPrestado);
    }

    @GetMapping
    public List<ServicoPrestado> pesquisar(
        @RequestParam(value = "nome",required = false) String nome,
                @RequestParam(value = "mes",required = false) Integer mes
    ){
        return servicorepository.findByNomeClienteAndMes("%" + nome + "%",mes);
    }
}
