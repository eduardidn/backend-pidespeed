import { emitSocket, emitToAdmin } from "./index";
const notificationsUser = [];
const notificationsEmpresa = [];
const notificationsAdmin = [];

export function checkNotifications() {
  notificationsUser.map((item: any) => {
    if (item.event) {
      emitSocket("user", item.id, item.event, item.data);
    }
  });
  notificationsEmpresa.map((item: any) => {
    if (item.event) {
      emitSocket("empresa", item.id, item.event, item.data);
    }
  });
  notificationsAdmin.map((item: any) => {
    if (item.event) {
      emitSocket("admin", item.id, item.event, item.data);
      if (item.admin) emitToAdmin(item.event, item.data);
    }
  });
}

export function deleteNotification(type, data) {
    if(type === "user")
      notificationsUser[data.userId] = {
        event: "",
      }
    else
      this.notificationsEmpresas[data.id] = {
        event: "",
      }
}

export async function pedido(type, data) {
  const emitPedidioNotification = {
    actualizado: PActualizado,
    nuevoEmpresa: PNuevoEmpresa,
    nuevo: (data) => emitToAdmin("nuevo", data),
    'actualizar:pedidos': (data) => emitToAdmin("actualizar:pedidos", data),
    'actualizar:pedidosEmpresa': (data) => emitSocket('empresa', data.id, "actualizar:pedidosEmpresa", data),
  };
  emitPedidioNotification[type](data);
}

function PActualizado(data) {
  emitSocket("user", data.userId, "pedido:actualizado", data);
  notificationsUser[data.userId] = {
    event: "pedido:actualizado",
    data,
  };
}

function PNuevoEmpresa(data) {
  emitSocket("empresa", data.id, "pedido:nuevoEmpresa", data)
    notificationsEmpresa[data.id] = {
      event: "pedido:actualizado",
      data,
    };
}
