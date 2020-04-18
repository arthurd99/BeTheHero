import React, { useState, useEffect } from "react"
import { View, FlatList, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Imports backend api created with axios
import api from "../../services/api"

// Imports icons from Feather Icons pack
import { Feather } from "@expo/vector-icons"

// Imports style features
import styles from "./styles"
import logoImg from "../../assets/logo.png"

// Incidents component
function Incidents() {
  // Creates a state to store each incident from database
  const [incidents, setIncidents] = useState([])

  // Creates a state to store incidents total number 
  const [total, setTotal] = useState(0)

  // Creates a state to store current page
  const [page, setPage] = useState(1)

  // Creates a state to store if the app is loading
  const [loading, setLoading] = useState(false)

  // Gets navigation instance, used to navigate between screens
  const navigation = useNavigation()

  /**
   * useEffect is a function that is called when something changes,
   * in this case, nothing. So it"s just called when the component is mounting.
   */
  useEffect(() => {
    loadIncidents()
  }, [])

  /*
  * Function called when you want to load incidents(when the user reaches
  * the end of the flat list, and on the mounting of the component)
   */
  async function loadIncidents() {
    // If it is already loading incidents, just return
    if (loading) {
      return
    }

    // If all the incidents from the database is already loaded, just return
    if (total > 0 && incidents.length == total) {
      return
    }

    // Updates loading state
    setLoading(true)

    // Tries to get incidents from database
    const response = await api.get("/incidents", {
      params: { page }
    })

    // And updates incidents state
    setIncidents([...incidents, ...response.data])

    // And updates total incidents counter
    setTotal(response.headers["x-total-count"])

    // And updates page
    setPage(page + 1)

    // And updates loading state again
    setLoading(false)
  }

  // Function called when you touch in one incident to see more details
  function navigateToDetail(incident) {
    // Redirects the user to detail page, passing which incident he touched
    navigation.navigate("Detail", { incident })
  }

  // Function called when you reach the end of the flat list, if the flat list is empty is called also.
  function renderFooter() {
    // If it"s already loading, just return. It"s necessary to not render footer twice
    if (!loading) return null

    // Returns a loading indicator (activity indicator)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#e02041" />
      </View>
    )
  }

  // Html returned when the component is rendered
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

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

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

// Exports component
export default Incidents
