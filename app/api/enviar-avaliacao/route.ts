import nodemailer from "nodemailer";

export async function POST(req: Request) {

  const data = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "giovanebruno100@gmail.com",
      pass: "pcit vjys cssy zhfy"
    }
  });

  const html = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;font-family:Arial,Helvetica,sans-serif">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.08)">

<tr>
<td style="background:#111;padding:25px;text-align:center;color:white">
<h1 style="margin:0;font-size:24px">🍸 Nova Avaliação</h1>
<p style="margin:5px 0 0;font-size:13px;color:#bbb">Picasso Bar</p>
</td>
</tr>

<tr>
<td style="padding:30px">

<table width="100%" cellpadding="8" cellspacing="0">

<tr>
<td style="color:#888;font-size:14px">Cliente</td>
<td style="font-weight:bold">${data.nome || "Não informado"}</td>
</tr>

<tr>
<td style="color:#888;font-size:14px">Data da visita</td>
<td style="font-weight:bold">${data.data_visita || "Não informado"}</td>
</tr>

<tr>
<td style="color:#888;font-size:14px">Conheceu por</td>
<td>${data.origem_cliente}</td>
</tr>

<tr>
<td style="color:#888;font-size:14px">Frequência</td>
<td>${data.frequencia}</td>
</tr>

<tr>
<td style="color:#888;font-size:14px">Expectativa</td>
<td>${data.expectativa}</td>
</tr>

</table>

</td>
</tr>

<tr>
<td style="padding:0 30px">

<div style="
background:#fafafa;
border-radius:10px;
padding:20px;
text-align:center;
margin-bottom:25px;
">

<p style="margin:0;color:#777;font-size:13px">Avaliação da experiência</p>

<p style="
margin:5px 0 0;
font-size:28px;
font-weight:bold;
color:#111
">
${data.avaliacao}
</p>

</div>

</td>
</tr>

<tr>
<td style="padding:0 30px">

<h3 style="margin-bottom:8px">👍 Pontos positivos</h3>

<div style="
background:#f8f8f8;
padding:15px;
border-radius:8px;
color:#444;
line-height:1.5;
margin-bottom:20px
">
${data.positivos || "—"}
</div>

<h3 style="margin-bottom:8px">⚠️ Melhorias</h3>

<div style="
background:#f8f8f8;
padding:15px;
border-radius:8px;
color:#444;
line-height:1.5;
">
${data.melhorias || "—"}
</div>

</td>
</tr>

<tr>
<td style="
padding:20px;
text-align:center;
font-size:12px;
color:#999;
border-top:1px solid #eee
">

Sistema de avaliações automático<br>
Picasso Bar

</td>
</tr>

</table>

</td>
</tr>
</table>
`;

  await transporter.sendMail({
    from: "Avaliações Picasso <giovanebruno100@gmail.com>",
    to: "calcisshoes@gmail.com",
    subject: "🍸 Nova avaliação recebida",
    html: html
  });

  return Response.json({ ok: true });

}