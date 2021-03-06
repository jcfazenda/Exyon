import { FuseNavigation } from '../../@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'Usuarios',
                title    : 'Usuarios', 
                type     : 'collapsable',
                icon     : 'fingerprint',
                children : [
                    {
                        id       : 'usuarios',
                        title    : 'Cadastro', 
                        type     : 'item',
                        url      : '/apps/equipe/usuarios'
                    },
                    {
                        id       : 'dados-pessoais',
                        title    : 'Profile', 
                        type     : 'item',
                        url      : '/apps/equipe/dados-pessoais'
                    }
                ]                
            } 
        ]
    } 
 
];
