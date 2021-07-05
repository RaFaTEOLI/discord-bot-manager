class GameController {
  game: string = 'nenhum jogo no momento';
  wins: number = 0;

  public async getGame(message: any) {
    await message.reply(`Estamos jogando ${this.game}`);
  }

  public async setGame(message: any, name: string) {
    this.game = name;
    await this.getGame(message);
  }

  public async resetGame(message: any) {
    this.game = 'nenhum jogo no momento';
    await message.reply(`Jogo atual atualizado!`);
  }

  public async getWins(message: any) {
    await message.reply(`Quantidade de vitórias: ${this.wins}`);
  }

  public async setWins(message: any) {
    this.wins++;
    await this.getWins(message);
  }

  public async resetWins(message: any) {
    this.wins = 0;
    await message.reply(`Quantidade de vitórias limpa!`);
  }
}

export default GameController;
