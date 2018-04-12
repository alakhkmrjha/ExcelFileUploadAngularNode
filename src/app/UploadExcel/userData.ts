
export interface IUserData{
    gender:string;
    name:{
                        title:string,
                        first: string,
                        last: string
                    },
                    location: {
                        street:string,
                        city: string,
                        state: string,
                        postcode: string
                    },
                    email: string,
                    dob: string,
                    registered: string,
                    phone: string,
                    cell: string,
                    id: {
                        name: string,
                        value: string
                    },
                    nat:string
                
}