import { idCheckOrGenerate } from '@app/common';

interface DomainIdent {
    id: string;
}

export function assignDomainModel<T extends DomainIdent>(domainModel: T, domainData: T): void {
    const { id } = domainData;
    Object.assign(domainModel, {
        ...domainData,
        id: idCheckOrGenerate(id),
    });
}
