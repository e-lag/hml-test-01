import { Injectable } from '@nestjs/common';
import { Vehicle } from '@app/vehicle/domain/vehicle.domain';
import { VehicleRepository } from '@app/vehicle/infrastructure/vehicle.repository';
import { VehicleModel } from '../models/vehicle.model';
import { RepositoryService } from '../repository.service';

@Injectable()
export class VehicleRepositoryAdapter implements VehicleRepository {
    constructor(private repositoryService: RepositoryService) {
    }

    async findOne(id: string): Promise<VehicleModel> {
        return this.repositoryService.vehicles.filter(vehicle => vehicle.id === id)[0];
    }

    async updateOne(vehicle: Vehicle): Promise<VehicleModel> {
        this.repositoryService.vehicles = this.repositoryService.vehicles.map(repositoryVehicle => {
            if (vehicle.id === repositoryVehicle.id) {
                return vehicle;
            } else {
                return repositoryVehicle;
            }
        });
        return vehicle;
    }

    async insertOne(vehicle: VehicleModel): Promise<VehicleModel> {
        this.repositoryService.vehicles.push({ ...vehicle });
        return vehicle;
    }

    async removeOne(id: string): Promise<VehicleModel|null> {
        const vehicle = this.findOne(id);
        if (!vehicle) {
            return null;
        }
        this.repositoryService.vehicles = this.repositoryService.vehicles.filter(vehicle => vehicle.id !== id);
        return vehicle;
    }

    findAll(): Promise<Vehicle[]> {
        return Promise.resolve(this.repositoryService.vehicles);
    }
}
