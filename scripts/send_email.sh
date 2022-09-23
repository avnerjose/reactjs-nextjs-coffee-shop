echo "Installing email dependencies"
sudo apt install mailutils
echo "Finishing instalation"
echo "Sending email" | mail -s "CI do Coffee Shop" ${EMAIL} <<< 'Todas as etapas de CI passaram com sucesso!'