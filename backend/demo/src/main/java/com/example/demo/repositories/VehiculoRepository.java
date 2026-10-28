package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.entities.Vehiculo;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo,Integer> {
    
}
