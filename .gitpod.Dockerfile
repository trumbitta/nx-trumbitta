FROM gitpod/workspace-full

# Install custom tools, runtime, etc.
USER root
RUN apt-get update && apt-get install -y zsh fonts-firacode && apt-get clean && rm -rf /var/cache/apt/* && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*

USER gitpod
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
ENV SHELL=zsh
RUN echo "alias gits='git status'" >> $HOME/.zshrc
RUN echo "alias ls='ls -GFh'" >> $HOME/.zshrc
ENV NVM_DIR="$HOME/.nvm"
RUN echo ". ~/.nvm/nvm.sh" >> $HOME/.zshrc
RUN sed -i 's/plugins=(git)/plugins=(git npm docker-compose docker)/' $HOME/.zshrc
RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
RUN sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="powerlevel10k\/powerlevel10k"/' $HOME/.zshrc
RUN wget https://gist.githubusercontent.com/trumbitta/dc0c235832c5851813746d5886e40c56/raw/4663769f792bc9990b6b18242819b37a89a8ce53/.p10k.zsh -O $HOME/.p10k.zsh
RUN echo "[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh" >> $HOME/.zshrc