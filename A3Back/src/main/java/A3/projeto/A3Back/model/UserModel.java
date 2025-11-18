package A3.projeto.A3Back.model;

import jakarta.persistence.*;
import org.hibernate.type.descriptor.jdbc.VarcharJdbcType;

@Entity
@Table(name="golpes")
public class UserModel {
    public enum MeioDeContato {
        Telefone,
        WhatsApp,
        SMS,
        Email,
        Outros
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")

    private Integer id;

    @Column(name="nome", length = 120, nullable = true)
    private String nome;

    @Column(name="cidade", length = 120, nullable = true)
    private String cidade;

    @Column(name="empresa", length = 160, nullable = true)
    private String empresa;

    @Column(name="cpf", length = 14, nullable = true)
    private String cpf;


    @Enumerated(EnumType.STRING)
    @Column(name="meio_contato", nullable = true)

    private MeioDeContato meioDeContato;


    @Column(name="descricao", nullable = true)

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    private String descricao;


    public MeioDeContato getMeioDeContato() {
        return meioDeContato;
    }

    public void setMeioDeContato(MeioDeContato meioDeContato) {
        this.meioDeContato = meioDeContato;
    }

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


}
