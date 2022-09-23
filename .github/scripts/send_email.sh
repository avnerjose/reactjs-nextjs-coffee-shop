echo "Installing email dependencies"
sudo apt install mailutils
echo "Finishing instalation"
echo "Todas as etapas de CI passaram com sucesso!" | mail -s "CI do Coffee Shop" ${EMAIL}