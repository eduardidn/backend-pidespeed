import {} from "@models";
import {} from "@utils";
import * as templates from "./templates";
import nodemailer from "nodemailer";

export async function mailCambio(val) {
  const { nombre, email, text, subject, codigo } = val;
  /* let transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: '587',
        auth: {
            user: 'pidespeed@gmail.com',
            pass: 'n90ChP4D5zkgbaNH'
        },
        logger: true,
        debug: false
    }); */

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "465",
    auth: {
      user: "Pidespeed@gmail.com",
      pass: "qphtkmofxbcvxkbl",
    },
    logger: true,
    debug: false,
  });
  const message = {
    from: "PideSpeed <Pidespeed@gmail.com>",
    to: nombre + "<" + email + ">",
    subject,
    // text: 'Hello to myself!',
    html: templates.mailCambio({ text, nombre, codigo }),
  };
  try {
    await transporter.sendMail(message);
    return { message: "ok" };
  } catch (err) {
    return err;
  }
}

export async function mailEstadoPedido(val) {
  const { nombre, email, contenido, codigo } = val;

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: "587",
    auth: {
      user: "pidespeed@gmail.com",
      pass: "n90ChP4D5zkgbaNH",
    },
    logger: true,
    debug: false,
  });
  const message = {
    from: "PideSpeed <Pidespeed@gmail.com>",
    to: nombre + "<" + email + ">",
    subject: "Actualización de su pedido",
    // text: 'Hello to myself!',
    html: templates.mailEstadoPedido({ contenido, codigo }),
  };
  try {
    await transporter.sendMail(message);
    return { message: "ok" };
  } catch (err) {
    return err;
  }
}

export async function mailPedidoListo(val) {
  const { nombre, email, codigo, nombreEmpresa, coordenadas } = val;

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: "587",
    auth: {
      user: "pidespeed@gmail.com",
      pass: "n90ChP4D5zkgbaNH",
    },
    logger: true,
    debug: false,
  });
  const message = {
    from: "PideSpeed <Pidespeed@gmail.com>",
    to: nombre + "<" + email + ">",
    subject: "Pedido Terminado",
    // text: 'Hello to myself!',
    html: templates.mailPedidoListo({ codigo, nombreEmpresa, coordenadas }),
  };
  try {
    const info = await transporter.sendMail(message);
    return { message: "ok" };
  } catch (err) {
    return err;
  }
}

export async function mailNuevoPedido(val) {
  const { nombre, email, codigo } = val;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "465",
    auth: {
      user: "Pidespeed@gmail.com",
      pass: "qphtkmofxbcvxkbl",
    },
    logger: true,
    debug: false,
  });
  const message = {
    from: "PideSpeed <Pidespeed@gmail.com>",
    to: nombre + "<" + email + ">",
    subject: "Nuevo Pedido",
    // text: 'Hello to myself!',
    html: templates.mailNuevoPedido({ nombre, codigo }),
  };
  try {
    const info = await transporter.sendMail(message);
    return { message: "ok" };
  } catch (err) {
    return err;
  }
}

/**
 * CORREOS PUBLICOS
 */

export async function mailBienvenido(val) {
  const { nombre, email } = val;

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: "587",
    auth: {
      user: "pidespeed@gmail.com",
      pass: "n90ChP4D5zkgbaNH",
    },
    logger: true,
    debug: false,
  });
  const message = {
    from: "PideSpeed <Pidespeed@gmail.com>",
    to: nombre + "<" + email + ">",
    subject: "Bienvenido a Pidespeed",
    // text: 'Hello to myself!',
    html: templates.mailBienvenido({ nombre }),
  };
  try {
    const info = await transporter.sendMail(message);
    return { message: "ok" };
  } catch (err) {
    return err;
  }
}

export async function mailRecuperarPass(val) {
  const { nombre, email, codigo } = val;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "465",
    auth: {
      user: "Pidespeed@gmail.com",
      pass: "qphtkmofxbcvxkbl",
    },
    logger: true,
    debug: false,
  });
  const message = {
    from: "PideSpeed <Pidespeed@gmail.com>",
    to: nombre + "<" + email + ">",
    subject: "Recuperación de Contraseña",
    html: templates.mailRecuperarPass({ nombre, codigo }),
  };
  try {
    const info = await transporter.sendMail(message);
    return { message: "ok" };
  } catch (err) {
    return err;
  }
}

export async function mailVerificacion(val) {
  const { nombre, email, link } = val;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "465",
    auth: {
      user: "Pidespeed@gmail.com",
      pass: "qphtkmofxbcvxkbl",
    },
    logger: true,
    debug: false,
  });
  const message = {
    from: "PideSpeed <Pidespeed@gmail.com>",
    to: nombre + "<" + email + ">",
    subject: "verifique su cuenta de PideSpeed",
    // text: 'Hello to myself!',
    html: templates.mailVerificacion({ nombre, link }),
  };
  try {
    const info = await transporter.sendMail(message);
    return { message: "ok" };
  } catch (err) {
    return err;
  }
}

export async function mailPromocion(val) {
  const { nombre, email } = val;

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: "587",
    auth: {
      user: "pidespeed@gmail.com",
      pass: "n90ChP4D5zkgbaNH",
    },
    logger: true,
    debug: false,
  });
  const message = {
    from: "PideSpeed <Pidespeed@gmail.com>",
    to: nombre + "<" + email + ">",
    subject: "20% de DESCUENTO Para Ti",
    // text: 'Hello to myself!',
    html: templates.mailPromocion({ nombre }),
  };
  try {
    const info = await transporter.sendMail(message);
    return { message: "ok" };
  } catch (err) {
    return err;
  }
}
