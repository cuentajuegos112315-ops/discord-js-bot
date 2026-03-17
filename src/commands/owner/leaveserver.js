/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "leaveserver",
  description: "leave a server.",
  category: "OWNER",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    minArgsCount: 1,
    usage: "<serverId>",
  },
  slashCommand: {
    enabled: false,
  },

  async messageRun(message, args, data) {
    // VERIFICACIÓN DE DUEÑO (¡IMPORTANTE!)
    const OWNER_ID = "1384351801758847066"; // Pón tu ID de usuario aquí
    if (message.author.id !== OWNER_ID) {
      return message.safeReply("Solo el dueño del bot puede usar este comando.");
    }

    const input = args[0];
    const guild = message.client.guilds.cache.get(input);
    
    if (!guild) {
      return message.safeReply(
        `No server found. Please provide a valid server id.\nYou may use ${data.prefix}findserver/${data.prefix}listservers to find the server id`
      );
    }

    const name = guild.name;
    try {
      await guild.leave();
      return message.safeReply(`Successfully Left \`${name}\``);
    } catch (err) {
      console.error("Error al abandonar el servidor:", err); // Muestra el error en consola
      return message.safeReply(`Failed to leave \`${name}\` - Error: ${err.message}`);
    }
  },
};