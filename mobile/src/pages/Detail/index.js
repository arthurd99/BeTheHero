import React from "react"
import { View, Image, Text, Linking } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler"

// Imports a mail composer from expo
import * as MailComposer from "expo-mail-composer"

// Imports icons from Feather Icons pack
import { Feather } from "@expo/vector-icons"

// Imports style features
import styles from "./styles"
import logoImg from "../../assets/logo.png"

// Detail component
function Detail() {
  // Gets navigation instance, used to navigate between screens
  const navigation = useNavigation()

  // Gets routes instance
  const route = useRoute()

  // Gets the incident from the params passed on the last page
  const incident = route.params.incident

  // Default message
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(incident.value)}.`

  // Function used when you touch arrow-left icon, it redirects you to the last screen
  function navigateBack() {
    navigation.goBack()
  }

  // Function used when you touch e-mail button, it composes a default email
  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    })
  }

  // Function used when you touch whatsapp button, it composes a default whatsapp message
  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`)
  }

  // Html returned when the component is rendered
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.incident}>
          <View style={styles.incidentGroups}>
            <View style={styles.incidentGroup}>
              <Text style={[styles.incidentProperty, { marginTop: 0 }]}>CASO:</Text>
              <Text style={[styles.incidentValue, { textAlign: "left" }]}>{incident.title}</Text>
            </View>

            <View style={styles.incidentGroup}>
              <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
            </View>
          </View>

          <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
          <Text style={styles.incidentValue}>{incident.description}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {/*
             * Intl is function which formats
             * numbers, in this case into BRL currency.
            */}
            {Intl.NumberFormat(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL"
              }
            ).format(incident.value)}
          </Text>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

          <Text styles={styles.heroDescription}>Entre em contato:</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
              <Text style={styles.actionText}>Whatsapp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={sendMail}>
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

// Exports component
export default Detail
