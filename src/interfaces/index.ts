export interface IUserCreate {
  ip: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone?: string;
  birth?: string;
  descripition?: string;
}

export interface IUserEdit {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  phone?: string;
  birth?: string;
  descripition?: string;
  type?: string;
  isActive?: boolean;
  isAdm?: boolean;
  isVerify?: boolean;
}

export interface IUserDelete {
  userId: string;
}

export interface IUserAddressCreate {
  userId: string;
  zipCode: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
}

export interface IUserAddressEdit {
  userId: string;
  addressId: string;
  zipCode?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: string;
  complement?: string;
}

export interface IUserAddressDelete {
  userId: string;
  addressId: string;
}

export interface IUserSessions {
  userId: string;
  ip: string;
  type: string;
}
export interface IAnnouncementCreate {
  ip: string;
  title: string;
  userId: string;
  saleType: string;
  descripition: string;
  year: string;
  milage: string;
  price: string;
  cover: string[];
}

export interface IAnnouncementEdit {
  userId?: string;
  announcementId: string;
  saleType?: string;
  descripition?: string;
  year?: string;
  milage?: string;
  price?: string;
  cover?: string;
}

export interface IAnnouncementDelete {
  userId: string;
  announcementId: string;
}

export interface IAnnouncementImagesCreate {
  userId?: string;
  announcementId: string;
  image: string;
}

export interface IAnnouncementImagesEdit {
  userId?: string;
  announcementId: string;
  announcementImageId: string;
  image: string;
}

export interface IAnnouncementImagesDelete {
  userId?: string;
  announcementId: string;
}

export interface IbidCreate {
  userId: string;
  announcementId: string;
  userName: string;
  bid: string;
}

export interface IbidDelete {
  userId: string;
  bidId: string;
}

export interface IReplyCreate {
  userId: string;
  announcementId: string;
  userName: string;
  reply: string;
}

export interface IReplyEdit {
  userId: string;
  announcementId: string;
  userName: string;
  reply: string;
}

export interface IReplyDelete {
  userId: string;
  replyId: string;
}
